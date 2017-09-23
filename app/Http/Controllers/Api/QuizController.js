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
    let output = {},
        top = yield User.top(5)

    let rank = 0,
        isOnTop = false

    output = top.toJSON()

    output.map(user => {
      if (user.id == request.authUser.id) {
        isOnTop = true
      }

      user.rank = ++rank

      return user
    })

    if (!isOnTop) {
      let user = request.authUser.toJSON()

      user.rank = yield request.authUser.getRank()

      output.push(user)
    }

    response.send(output)
  }
}
