'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const youch = new Youch(error, request.request)
    const type = request.accepts('json', 'html')
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  if (error.name === 'InvalidLoginException') {
    response.route('admin.login')

    return
  }

  /**
   * PRODUCTION REPORTER
   */
  console.error(error.stack)
  yield response.status(status).sendView('errors/index', {error})
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
  const path = require('path'),
        Helpers = use('Helpers'),
        Config = use('Config'),
        Route = use('Route'),
        View = use('View')

  View.global('mix', text => {
    if (!text) {
      return
    }

    const manifest = require(path.join(Helpers.publicPath(), 'mix-manifest.json'))

    return manifest[text]
  })

  View.global('url', (route, data) => {
    data = data || {}

    return Route.url(route, data)
  })

  View.global('config', (key, defaultValue) => {
    return Config.get(key, defaultValue)
  })

  // Start game engine
  use('App/Addons/Game').start()
}
