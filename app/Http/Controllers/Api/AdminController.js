const Engine = use('App/Addons/Game')

module.exports = class Controller {

  * open (request, response) {
    let state = Engine.getGameState()

    if (request.method() == 'POST') {
      let state = request.input('state')

      switch (state) {
        case 'open':
          Engine.open()
          break

        case 'close':
          Engine.close()
          break
      }

      response.status(204).send()

      return
    }

    response.send({ state })
  }

}
