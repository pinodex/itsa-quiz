'use strict'

class MainController {

  * index (request, response) {
    yield response.sendView('admin/index')
  }

  * login (request, response) {
    if (request.method() == 'POST') {
      try {
        const auth = yield request.auth.attempt(
          request.input('username'),
          request.input('password')
        )
      } catch (e) {
        yield request.withOut('password').andWith({ error: 'Invalid username and/or password' }).flash()

        response.route('admin.login')
        return
      }

      response.route('admin.index')
      return
    }

    yield response.sendView('admin/login')
  }

  * logout (request, response) {
    yield request.auth.logout()

    response.route('admin.login')
  }

}

module.exports = MainController
