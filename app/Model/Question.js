'use strict'

const Lucid = use('Lucid')

class Question extends Lucid {

  static get hidden () {
    return ['choice_id']
  }

}

module.exports = Question
