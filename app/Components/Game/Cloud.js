const rng = require('random-js')(),
      uuid = require('uuid/v4')

class Cloud {

  constructor () {
    this.id = uuid()

    this.difficulty = rng.integer(1, 3)

    this.position_x = -rng.integer(50, 100)
    this.position_y = rng.integer(0, 70)
  }

  get size () {
    switch (this.difficulty) {
      case 1:
        return 'small'

      case 2:
        return 'medium'

      case 3:
        return 'large'
    }

    return 'small'
  }

  get speed () {
    // Speed is inversely proportional to difficulty
    return (80 - (this.difficulty * 20)) / 100
  }

  toJSON () {
    return {
      id: this.id,
      size: this.size,
      speed: this.speed,
      difficulty: this.difficulty,
      position_x: this.position_x,
      position_y: this.position_y
    }
  }

}

module.exports = Cloud
