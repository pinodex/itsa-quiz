'use strict'

const Account = use('App/Model/Account')
const Validator = use('Validator')

class AccountController {
  * index (request, response) {
    const accounts = yield Account.all()

    yield response.sendView('admin/account/index', {
      result: accounts
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let model = new Account()

    if (paramId) {
      model = yield Account.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested account' }).flash()

      response.route('admin.accounts')
      return
    }

    if (request.method() == 'POST') {
      const data = request.only([
        'name',
        'username',
        'password',
        'password_confirm',
      ])

      const validation = yield Validator.validate(data,
        Account.rules(model.id), Account.validationMessages
      )

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (model.id) {
          response.route('admin.accounts.edit', { id: model.id })
          return
        }

        response.route('admin.accounts.add')
        return
      }

      delete data['password_confirm']

      if (data['password'] == '') {
        delete data['password']
      }

      model.fill(data)

      yield model.save()
      yield request.with({ success: `Changes to ${model.name} has been saved` }).flash()

      response.route('admin.accounts')

      return
    }

    yield response.sendView('admin/account/edit', { model })
  }

  * delete (request, response) {
    const model = yield Account.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested account' }).flash()

      response.route('admin.accounts')

      return
    }

    if (request.method() == 'POST') {
      yield model.delete()
      yield request.with({ success: `${model.name} account has been deleted` }).flash()

      response.route('admin.accounts')

      return
    }

    yield response.sendView('admin/account/delete', { model })
  }
}

module.exports = AccountController
