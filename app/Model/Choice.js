'use strict'

const Lucid = use('Lucid')

class Choice extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Uuid.setId')
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
      is_answer: 'required|in:0,1'
    }
  }

  static get validationMessages () {
    return {
      'text.required': 'Text field cannot be empty',
      'is_answer.required': 'Is answer field cannot be empty',
      'is_answer.in': 'Invalid is answer value'
    }
  }

}

module.exports = Choice
