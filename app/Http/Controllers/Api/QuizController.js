const Question = use('App/Model/Question'),
      User = use('App/Model/User')

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

    response.send(question)
  }

  /**
   * Leaderboard action
   */
  * leaderboard (request, response) {
    let top = yield User.top(5)

    response.send(top)
  }
}
