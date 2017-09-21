'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.uuid('id').primary()
      table.string('fbid').notNullable()
      table.string('name').notNullable()
      table.integer('score').notNullable()
      table.integer('correct_count').notNullable()
      table.integer('incorrect_count').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
