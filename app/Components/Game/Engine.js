const Sky = use('App/Components/Game/Sky'),
      Question = use('App/Components/Game/Question')

class Engine {

  constructor (event, tick = 500) {
    this.sky = new Sky()
    this.question = new Question()

    this.event = event
    this.tick = tick

    this.interval = null
  }

  start () {
    if (this.interval) {
      return
    }

    this.interval = setInterval(this._loop.bind(this), this.tick)
  }

  * getQuestion (difficulty) {
    const question = yield this.question.getRandomOfDifficulty(difficulty)

    return question
  }

  _loop () {
    const cloud = this.sky.createCloud()

    this.event.fire('game:cloud:spawn', cloud)
  }

}

module.exports = Engine
