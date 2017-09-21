'use strict'

const uuidV4 = require('uuid/v4'),
      Uuid = exports = module.exports = {}

Uuid.setId = function * (next) {
  this.id = uuidV4()

  yield next
}
