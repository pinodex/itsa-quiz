'use strict'

const Validator = use('Validator'),
      Account = use('App/Model/Account')

class AccountController {

  * index (request, response) {
    let accounts = yield Account.all()

    yield response.sendView('admin/account/index', {
      result: accounts
    })
  }

  * edit (request, response) {
    let paramId = request.param('id'),
        model = new Account()

    if (paramId) {
      model = yield Account.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested account' }).flash()

      response.route('admin.accounts')

      return
    }

    if (request.method() == 'POST') {
      let data = request.only([
        'name', 'username', 'password', 'password_confirm',
      ])

      let validation = yield Validator.validate(data,
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
    let model = yield Account.find(request.param('id'))

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
