const co = require('co'),
      fb = use('App/Addons/Facebook'),
      User = use('App/Model/User')

module.exports = class Controller {
  /**
   * Login action
   */
  * login (request, response) {
    const accessToken = request.input('token')

    fb.options({ accessToken })

    fb.api('me', { fields: ['id', 'name', 'picture'] })
      .then(fbr => {
        const fbid = fbr.id,
              name = fbr.name

        co(function * () {
          const props = { fbid, name },
                user = yield User.findOrCreate({ fbid }, props)

          user.fill(props)
          yield user.save()

          yield request.auth
            .authenticator('user')
            .loginViaId(user.id)

          response.send(user)
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
