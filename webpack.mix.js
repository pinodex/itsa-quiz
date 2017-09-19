const { mix } = require('laravel-mix');

let options = {
    processCssUrls: false
}

mix
  .sass('resources/assets/scss/main.scss', 'public/assets/css')
  .sass('resources/assets/scss/bulma.scss', 'public/assets/css')
  .sass('node_modules/font-awesome/scss/font-awesome.scss', 'public/assets/css')

  .js('resources/assets/js/app.js', 'public/assets/js')

  .copy('resources/assets/img', 'public/assets/img')
  .copy('node_modules/font-awesome/fonts', 'public/assets/fonts')

  .extract(['vue', 'vuex', 'buefy', 'axios', 'adonis-websocket-client', 'promise.prototype.finally'])

  .disableNotifications()
  .setPublicPath('public')
  .options(options)

if (mix.inProduction()) {
  mix.version()
}
