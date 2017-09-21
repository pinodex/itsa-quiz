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

  static get createTimestamp () {
    return null
  }

  static get updateTimestamp () {
    return null
  }

  static rules (id) {
    return {
      text: 'required',
      difficulty: 'required|in:1,2,3'
    }
  }

  static get validationMessages () {
    return {
      'text.required': 'Text field cannot be empty',
      'difficulty.required': 'Difficulty field cannot be empty',
      'difficulty.in': 'Invalid difficulty value'
    }
  }

}

module.exports = Question
