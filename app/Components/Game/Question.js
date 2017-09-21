const Model = use('App/Model/Question')

class Question {

  * getById (id) {
    let question = yield Model.find(id)

    return question
  }

  * getRandom () {
    let question = yield Model.query()
      .with('choices')
      .orderByRaw('RAND()')
      .first()

    return question
  }

  * getRandomOfDifficulty (difficulty) {
    let question = yield Model.query()
      .with('choices')
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
