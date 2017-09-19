'use strict'

const NE = require('node-exceptions')
class UserNotFoundException extends NE.LogicalException {}
class PasswordMisMatchException extends NE.LogicalException {}
class InvalidLoginException extends NE.LogicalException {}
class TokeNotFoundException extends NE.LogicalException {}
class InvalidTokenException extends NE.LogicalException {}

module.exports = {
  UserNotFoundException,
  PasswordMisMatchException,
  InvalidArgumentException: NE.InvalidArgumentException,
  InvalidLoginException,
  InvalidTokenException,
  TokeNotFoundException }
