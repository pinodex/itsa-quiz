const Question = use('App/Model/Question')

module.exports = class Controller {
  /**
   * Question action
   */
  * question (request, response) {
    const difficulty = request.input('difficulty', 1),
          question = yield Question.query()
            .where('difficulty', difficulty)
            .orderByRaw('RAND()')
            .first()

    yield response.send(question)
  }
}
