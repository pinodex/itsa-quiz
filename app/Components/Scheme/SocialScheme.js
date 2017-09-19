'use strict'

const BaseScheme = use('App/Components/Scheme/BaseScheme')
const NE = require('node-exceptions')

class SessionScheme extends BaseScheme {

  get sessionKey () {
    return 'social-auth'
  }

  * _getRequestUser () {
    const userSession = yield this.request.session.get(this.sessionKey)

    if (!userSession) {
      return null
    }

    return yield this.serializer.findById(userSession, this.options)
  }

  * login (user) {
    const primaryKey = this.serializer.primaryKey(this.options)
    const primaryValue = user[primaryKey]

    if (!primaryValue) {
      throw new NE.InvalidArgumentException(`Value for ${primaryKey} is null for given user.`)
    }

    yield this.request.session.put(this.sessionKey, primaryValue)

    this.user = user

    return true
  }

  * logout () {
    yield this.request.session.forget(this.sessionKey)

    this.user = null

    return true
  }

  * loginViaId (userId) {
    const user = yield this.serializer.findById(userId, this.options)

    if (!user) {
      return false
    }

    return yield this.login(user)
  }

  * attempt (uid, password) {
    const user = yield this.validate(uid, password, true)

    return yield this.login(user)
  }

}

module.exports = SessionScheme
