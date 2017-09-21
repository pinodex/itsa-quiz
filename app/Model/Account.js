'use strict'

const Lucid = use('Lucid')

class Account extends Lucid {

  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'Account.encryptPassword')
    this.addHook('beforeUpdate', 'Account.encryptPassword')
  }

  static rules (id) {
    return {
      name: 'required',
      username: `required|unique:accounts,username,id,${id}`,
      password: 'min:8',
      password_confirm: 'required_if:password|same:password'
    }
  }

  static get validationMessages () {
    return {
      'name.required': 'Name field cannot be empty',
      'username.required': 'Username field cannot be empty',
      'username.unique': 'Username already in use',
      'password.min': 'Password should be at least 8 characters long',
      'password_confirm.required_if': 'Password confirmation field cannot be empty',
      'password_confirm.same': 'Password confirmation does not match'
    }
  }

}

module.exports = Account
