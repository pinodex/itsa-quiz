'use strict'

const Validator = use('Validator'),
      Question = use('App/Model/Question'),
      Choice = use('App/Model/Choice')

class QuestionChoiceController {

  * index (request, response) {
    let question = yield Question.findOrFail(request.param('id'))

    yield question.related('choices').load()

    yield response.sendView('admin/question/choice/index', {
      result: question.relations.choices,
      question: question
    })
  }

  * edit (request, response) {
    let question = yield Question.findOrFail(request.param('id')),
        paramId = request.param('choice_id'),
        model = new Choice()

    if (paramId) {
      model = yield question.choices().where('id', paramId).first()
    }

    if (model == null) {
      yield request.with({ error: 'Cannot find requested choice' }).flash()

      response.route('admin.questions.choices')

      return
    }

    if (request.method() == 'POST') {
      let data = request.only(['text', 'is_answer'])

      let validation = yield Validator.validate(data,
        Choice.rules(model.id), Choice.validationMessages
      )

      if (validation.fails()) {
        yield request.withAll().andWith({ errors: validation.messages() }).flash()

        if (model.id) {
          response.route('admin.questions.choices.edit', { id: question.id, choice_id: model.id })

          return
        }

        response.route('admin.questions.choices.add', { id: question.id })

        return
      }

      model.fill(data)
      model.question_id = question.id

      yield model.save()
      yield request.with({ success: `Changes to choice has been saved` }).flash()

      response.route('admin.questions.choices', { id: question.id })

      return
    }

    yield response.sendView('admin/question/choice/edit', { model, question })
  }

  * delete (request, response) {
    let question = yield Question.findOrFail(request.param('id')),
        model = yield question.choices().where('id', request.param('choice_id')).first()

    if (model == null) {
      yield request.with({ error: 'Cannot find requested choice' }).flash()

      response.route('admin.questions.choices', { id: question.id })

      return
    }

    if (request.method() == 'POST') {
      yield model.delete()
      yield request.with({ success: `Question has been deleted` }).flash()

      response.route('admin.questions.choices', { id: question.id })

      return
    }

    yield response.sendView('admin/question/choice/delete', { question, model })
  }

}

module.exports = QuestionChoiceController
