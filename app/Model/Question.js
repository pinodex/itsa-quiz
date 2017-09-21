'use strict'

const Lucid = use('Lucid')

class Question extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Uuid.setId')
  }

  static get hidden () {
    return ['choice_id']
  }

  choices () {
    return this.hasMany('App/Model/Choice')
  }

}

module.exports = Question
