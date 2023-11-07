import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 100).unique().notNullable()
      table.string('name', 100).notNullable()
      table.string('last_name', 200).notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('avatar_path')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
