'use strict'

const User = use('App/Model/User')

class RankingController {

  * index (request, response) {
    let users = yield User.top(60)

    yield response.sendView('admin/ranking/index', { users })
  }

}

module.exports = RankingController
