'use strict'

const Question = use('App/Model/Question')
const Validator = use('Validator')

class QuestionController {
  * index (request, response) {
    const questions = yield Question.all()

    yield response.sendView('admin/question/index', {
      result: questions
    })
  }

  * edit (request, response) {
    const paramId = request.param('id')
    let model = new Question()

    if (paramId) {
      model = yield Question.find(paramId)
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested question' }).flash()

      response.route('admin.questions')

      return
    }

    if (request.method() == 'POST') {
      const data = request.only([
        'difficulty', 'text'
      ])

      const validation = yield Validator.validate(data,
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
    const model = yield Question.find(request.param('id'))

    if (model == null) {
      yield request.with({ error: 'Cannot find requested question' }).flash()

      response.route('admin.questions')

      return
    }

    if (request.method() == 'POST') {
      yield model.delete()
      yield request.with({ success: `Question has been deleted` }).flash()

      response.route('admin.questions')

      return
    }

    yield response.sendView('admin/question/delete', { model })
  }
}

module.exports = QuestionController
