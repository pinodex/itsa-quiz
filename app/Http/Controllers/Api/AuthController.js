const co = require('co'),
      fb = use('App/Addons/Facebook'),
      User = use('App/Model/User')

module.exports = class Controller {
  /**
   * Login action
   */
  * login (request, response) {
    let accessToken = request.input('token')

    fb.options({ accessToken })

    fb.api('me', { fields: ['id', 'name', 'picture'] })
      .then(fbr => {
        let fbid = fbr.id,
            name = fbr.name

        co(function * () {
          let props = { fbid, name },
              user = yield User.findOrCreate({ fbid }, props)

          yield request.auth
            .authenticator('user')
            .loginViaId(user.id)

          let model = yield User.find(user.id)

          response.send(model)
        })
      })
  }

  /**
   * Logout action
   */
  * logout (request, response) {
    yield request.auth.authenticator('user').logout()

    response.status(204).send()
  }
}
