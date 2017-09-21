'use strict'

const Lucid = use('Lucid')

class Choice extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Uuid.setId')
  }

}

module.exports = Choice
