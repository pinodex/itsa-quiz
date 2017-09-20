'use strict'

const Schema = use('Schema')

class ChoicesTableSchema extends Schema {

  up () {
    this.create('choices', (table) => {
      table.increments()
      table.integer('question_id')
      table.string('text')
    })
  }

  down () {
    this.drop('choices')
  }

}

module.exports = ChoicesTableSchema
