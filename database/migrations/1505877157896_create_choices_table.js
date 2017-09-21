'use strict'

const Schema = use('Schema')

class ChoicesTableSchema extends Schema {

  up () {
    this.create('choices', (table) => {
      table.uuid('id').primary()
      table.uuid('question_id').notNullable()
      table.string('text')
      table.boolean('is_answer')
    })
  }

  down () {
    this.drop('choices')
  }

}

module.exports = ChoicesTableSchema
