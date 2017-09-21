'use strict'

const Event = use('Event'),
      Engine = use('App/Addons/Game'),
      co = require('co')

class QuizController {

  constructor (socket, request) {
    this.socket = socket
    this.request = request

    Event.when('game:cloud:spawn', this.socket.id, cloud => {
      this.socket.toMe().emit('cloud:spawn', cloud)
    })
  }

  onDisconnect () {
    Event.removeListener('game:cloud:spawn', this.socket.id)
  }

  onCloudPop (cloud) {
    if (!('difficulty' in cloud)) {
      return
    }

    co(function * () {
      let question = yield Engine.getQuestion(cloud.difficulty)

      return question
    }).then(question => {
      this.socket.toMe().emit('cloud:pop', cloud.id)
      this.socket.toMe().emit('question', question)
    })
  }

}

module.exports = QuizController
