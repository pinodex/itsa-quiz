'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.uuid('id').primary()
      table.string('fbid').notNullable()
      table.string('name').notNullable()
      table.integer('score').notNullable().defaultTo(0)
      table.integer('correct_count').notNullable().defaultTo(0)
      table.integer('incorrect_count').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
