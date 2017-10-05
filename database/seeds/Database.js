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
      Hash = use('Hash')

class DatabaseSeeder {

  * run () {
    let password = yield Hash.make('admin')

    yield Account.create({
      name: 'Admin',
      username: 'admin',
      password
    })
  }

}

module.exports = DatabaseSeeder
