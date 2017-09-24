'use strict'

const Event = use('Event'),
      Engine = use('App/Addons/Game'),
      co = require('co')

class GameController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    switch (Engine.isOpen()) {
      case true:
        this.socket.toMe().emit('state:open')
        break

      case false:
        this.socket.toMe().emit('state:close')
        break
    }

    Event.when('game:cloud:spawn', this.socket.id, cloud => {
      if (!Engine.isOpen()) {
        return
      }

      this.socket.toMe().emit('cloud:spawn', cloud)
    })

    Event.when('game:state:open', this.socket.id, () => {
      this.socket.toMe().emit('state:open')
    })

    Event.when('game:state:close', this.socket.id, () => {
      this.socket.toMe().emit('state:close')
    })
  }

  onDisconnect () {
    Event.removeListener('game:cloud:spawn', this.socket.id)
    Event.removeListener('game:state:close', this.socket.id)
    Event.removeListener('game:state:open', this.socket.id)
  }

  onCloudPop (cloud) {
    if (!('difficulty' in cloud)) {
      return
    }

    co(function * () {
      let question = yield Engine.getQuestion(cloud.difficulty)

      return question
    }).then(question => {
      if (!Engine.isOpen()) {
        return
      }

      this.socket.toMe().emit('question', question)

      this.socket.toMe().emit('cloud:pop', cloud.id)
    })
  }

  onQuestionAnswer (data) {
    if (!Engine.isOpen()) {
      return
    }

    if (!('question' in data) || !('choice' in data)) {
      return
    }

    let user = this.socket.authUser

    co(function * () {
      yield Engine.answer(user, data.question, data.choice)
    })
  }

}

module.exports = GameController
