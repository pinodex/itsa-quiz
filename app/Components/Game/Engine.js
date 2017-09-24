const shuffle = require('knuth-shuffle').knuthShuffle,
      Sky = use('App/Components/Game/Sky'),
      Question = use('App/Components/Game/Question'),
      Answer = use('App/Model/Answer')

const GAME_STATE = 'GAME_STATE'

class Engine {

  constructor (event, env, tick = 500) {
    this.sky = new Sky()
    this.question = new Question()

    this.event = event
    this.env = env
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
    let output = {},
        question = yield this.question.getRandomOfDifficulty(difficulty)

    output = question.toJSON()

    shuffle(output.choices)

    output.expiry = 5 * difficulty

    return output
  }

  getGameState () {
    return this.env.get(GAME_STATE)
  }

  close () {
    this.env.set(GAME_STATE, 'close')

    this.event.fire('game:state:close')
  }

  open () {
    this.env.set(GAME_STATE, 'open')

    this.event.fire('game:state:open')
  }

  isOpen () {
    return this.env.get(GAME_STATE) == 'open'
  }

  * answer (user, question_id, choice_id) {
    let question = yield this.question.getById(question_id)

    if (!question) {
      return
    }

    let choice = yield question.choices().where('id', choice_id).first()

    if (!choice) {
      return
    }

    let answer = new Answer()

    answer.user_id = user.id
    answer.question_id = question.id
    answer.choice_id = choice.id

    yield answer.save()

    yield user.computeScore()

    this.event.fire('user:update', user)
  }

  _loop () {
    const cloud = this.sky.createCloud()

    this.event.fire('game:cloud:spawn', cloud)
  }

}

module.exports = Engine
