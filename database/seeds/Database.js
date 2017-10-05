'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

const Account = use('App/Model/Account'),
      Question = use('App/Model/Question'),
      Choice = use('App/Model/Choice'),
      Hash = use('Hash')

class DatabaseSeeder {

  * run () {
    let password = yield Hash.make('admin')

    yield Account.create({
      name: 'Admin',
      username: 'admin',
      password
    })

    let question = yield Question.create({
      text: 'This is a sample question',
      difficulty: 1
    })

    yield Choice.create({
      question_id: question.id,
      text: 'This is correct answer',
      is_answer: 1
    })

    yield Choice.create({
      question_id: question.id,
      text: 'This is wrong answer',
      is_answer: 0
    })
  }

}

module.exports = DatabaseSeeder
