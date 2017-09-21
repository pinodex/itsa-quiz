'use strict'

const Validator = use('Validator'),
      Question = use('App/Model/Question')

class QuestionController {

  * index (request, response) {
    let questions = yield Question.all()

    yield response.sendView('admin/question/index', {
      result: questions
    })
  }

  * edit (request, response) {
    let paramId = request.param('id'),
        model = new Question()

    if (paramId) {
      model = yield Question.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested question' }).flash()

      response.route('admin.questions')

      return
    }

    if (request.method() == 'POST') {
      let data = request.only(['difficulty', 'text'])

      let validation = yield Validator.validate(data,
        Question.rules(model.id), Question.validationMessages
      )

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (model.id) {
          response.route('admin.questions.edit', { id: model.id })

          return
        }

        response.route('admin.questions.add')

        return
      }

      model.fill(data)

      yield model.save()
      yield request.with({ success: `Changes to question has been saved` }).flash()

      response.route('admin.questions')

      return
    }

    yield response.sendView('admin/question/edit', { model })
  }

  * delete (request, response) {
    let model = yield Question.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested question' }).flash()

      response.route('admin.questions')

      return
    }

    if (request.method() == 'POST') {
      yield model.choices().delete()
      yield model.delete()

      yield request.with({ success: `Question has been deleted` }).flash()

      response.route('admin.questions')

      return
    }

    yield response.sendView('admin/question/delete', { model })
  }

}

module.exports = QuestionController
