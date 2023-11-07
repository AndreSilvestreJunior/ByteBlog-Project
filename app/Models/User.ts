import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public name: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatarUrl: string | null

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
