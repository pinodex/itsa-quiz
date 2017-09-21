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
    .middleware('auth:user')

}).prefix('api')

Route.group('api.quiz', function () {

  Route.get('question', 'Api/QuizController.question')

}).prefix('api/quiz')
  .middleware('auth:user')

/**
 * Admin routes
 */
Route.group('admin', () => {

  Route
    .get('/', 'Admin/MainController.index')
    .as('admin.index')
    .middleware('auth:account')

  Route
    .route('login', ['GET', 'POST'], 'Admin/MainController.login')
    .as('admin.login')

  Route
    .get('logout', 'Admin/MainController.logout')
    .as('admin.logout')
    .middleware('auth:account')

}).prefix('admin')

Route.group('admin.accounts', () => {

  Route
    .get('/', 'Admin/AccountController.index')
    .as('admin.accounts')

  Route
    .route('add', ['GET', 'POST'], 'Admin/AccountController.edit')
    .as('admin.accounts.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Admin/AccountController.edit')
    .as('admin.accounts.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Admin/AccountController.delete')
    .as('admin.accounts.delete')

}).prefix('admin/accounts')
  .middleware('auth:account')

Route.group('admin.questions', () => {

  Route
    .get('/', 'Admin/QuestionController.index')
    .as('admin.questions')

  Route
    .route('add', ['GET', 'POST'], 'Admin/QuestionController.edit')
    .as('admin.questions.add')

  Route
    .route(':id/edit', ['GET', 'POST'], 'Admin/QuestionController.edit')
    .as('admin.questions.edit')

  Route
    .route(':id/delete', ['GET', 'POST'], 'Admin/QuestionController.delete')
    .as('admin.questions.delete')

  Route
    .get('/:id/choices', 'Admin/QuestionChoiceController.index')
    .as('admin.questions.choices')

  Route
    .route('/:id/choices/add', ['GET', 'POST'], 'Admin/QuestionChoiceController.edit')
    .as('admin.questions.choices.add')

  Route
    .route('/:id/choices/:choice_id/edit', ['GET', 'POST'], 'Admin/QuestionChoiceController.edit')
    .as('admin.questions.choices.edit')

  Route
    .route('/:id/choices/:choice_id/delete', ['GET', 'POST'], 'Admin/QuestionChoiceController.delete')
    .as('admin.questions.choices.delete')

}).prefix('admin/questions')
  .middleware('auth:account')
