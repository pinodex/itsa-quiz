'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Uuid.setId')
  }

  clouds () {
    return this.hasMany('App/Model/Cloud')
  }

}

module.exports = User
