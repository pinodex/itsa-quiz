'use strict'

const Event = use('Event')

class UserController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    Event.when('user:update', this.socket.id, user => {
      this.socket.toMe().emit('update', user)
    })
  }

  onDisconnect () {
    Event.removeListener('user:update', this.socket.id)
  }

}

module.exports = UserController
