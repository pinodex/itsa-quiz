'use strict'

const Schema = use('Schema')

class AnswersTableSchema extends Schema {

  up () {
    this.create('answers', (table) => {
      table.increments()
      table.uuid('user_id').notNullable()
      table.uuid('question_id').notNullable()
      table.uuid('choice_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('answers')
  }

}

module.exports = AnswersTableSchema
