'use strict'

const Event = use('Event')

class UserController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    Event.when('user:update', this.socket.id, user => {
      if (this.request.authUser.id == user.id) {
        this.socket.toMe().emit('update', user)
      }
    })
  }

  onDisconnect () {
    Event.removeListener('user:update', this.socket.id)
  }

}

module.exports = UserController
