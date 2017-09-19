'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'MainController.index')

/*
 * API routes
 */
Route.group('api', function () {

  Route.post('login', 'Api/AuthController.login')

  Route.post('logout', 'Api/AuthController.logout')

}).prefix('api')
