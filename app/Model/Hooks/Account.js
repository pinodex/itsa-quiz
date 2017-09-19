'use strict'

const Hash = use('Hash')
const Account = exports = module.exports = {}

Account.encryptPassword = function * (next) {
  if (this.attributes.password != this.original.password) {
    this.password = yield Hash.make(this.password)
  }
  
  yield next
}