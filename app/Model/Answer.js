'use strict'

const Lucid = use('Lucid')

class Answer extends Lucid {

  question () {
    return this.belongsTo('App/Model/Question')
  }

  choice () {
    return this.belongsTo('App/Model/Choice')
  }

}

module.exports = Answer
