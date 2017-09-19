'use strict'

const CE = require('./Exceptions')

class BaseScheme {

  constructor (request, serializer, options) {
    this.request = request
    this.serializer = serializer
    this.options = options
    this.user = null
  }

  * check () {
    if (this.user) {
      return true
    }

    const requestUser = yield this._getRequestUser()

    this.user = requestUser

    return !!requestUser
  }

  * getUser () {
    const isLoggedIn = yield this.check()

    if (!isLoggedIn) {
      return null
    }

    return this.user
  }

  * validate (uid, password, returnUser) {
    const user = yield this.serializer.findByCredentials(uid, this.options)

    if (!user) {
      throw new CE.UserNotFoundException(`Unable to find user with ${uid} ${this.options.uid}`)
    }

    const isValid = yield this.serializer.validateCredentials(user, password, this.options)

    if (!isValid) {
      throw new CE.PasswordMisMatchException('Password does not match')
    }

    return returnUser ? user : true
  }

  _getRequestToken () {
    let token = this.request.header('authorization')

    if (token) {
      token = token.split(' ')
      return (token.length === 2 && token[0] === 'Bearer') ? token[1] : null
    }

    return this.request.input('token')
  }
}

module.exports = BaseScheme
