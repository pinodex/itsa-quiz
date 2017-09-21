const Cloud = use('App/Components/Game/Cloud')

class Sky {

  createCloud (question) {
    const cloud = new Cloud(question)

    return cloud
  }

}

module.exports = Sky
