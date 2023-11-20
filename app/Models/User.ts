import { DateTime } from 'luxon'
import {
  BaseModel,
  HasMany,
  ManyToMany,
  beforeSave,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Hash from '@ioc:Adonis/Core/Hash'

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

  @manyToMany(() => Post, {
    pivotTable: 'favorites',
  })
  public favorites: ManyToMany<typeof Post>

  @manyToMany(() => Post, {
    pivotTable: 'post_like',
  })
  public postsLike: ManyToMany<typeof Post>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
