'use strict'

const Schema = use('Schema')

class QuestionsTableSchema extends Schema {

  up () {
    this.create('questions', (table) => {
      table.uuid('id').primary()
      table.integer('difficulty', 1).notNullable()
      table.string('text').notNullable()
    })
  }

  down () {
    this.drop('questions')
  }

}

module.exports = QuestionsTableSchema
