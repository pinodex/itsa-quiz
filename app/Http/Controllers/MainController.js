module.exports = class Controller {
  * index (request, response) {
    let user = yield request.auth.authenticator('user').getUser()

    yield response.sendView('index', { user })
  }
}
