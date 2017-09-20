'use strict'

const Schema = use('Schema')

class QuestionsTableSchema extends Schema {

  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('choice_id').notNullable()
      table.integer('difficulty', 1).notNullable()
      table.string('text').notNullable()
    })
  }

  down () {
    this.drop('questions')
  }

}

module.exports = QuestionsTableSchema
