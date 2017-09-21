const Model = use('App/Model/Question')

class Question {

  * getRandom () {
    const question = yield Model.query()
      .orderByRaw('RAND()')
      .first()

    return question
  }

  * getRandomOfDifficulty (difficulty) {
    let question = yield Model.query()
      .where('difficulty', difficulty)
      .orderByRaw('RAND()')
      .first()

    if (!question) {
      question = yield this.getRandom()
    }

    return question
  }

}

module.exports = Question
