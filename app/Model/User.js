'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Uuid.setId')
  }

  answers () {
    return this.hasMany('App/Model/Answer')
  }

  * computeScore () {
    yield this.related('answers', 'answers.question', 'answers.choice').load()

    let score = 0,
        correct = 0,
        incorrect = 0

    this.relations.answers.each(answer => {
      if (!answer.relations.choice.is_answer) {
        incorrect++

        return true
      }

      score += answer.relations.question.difficulty * 10
      correct++
    })

    this.score = score
    this.correct_count = correct
    this.incorrect_count = incorrect

    yield this.save()

    return score
  }

}

module.exports = User
