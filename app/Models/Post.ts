import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public imgUrl: string | null

  @column()
  public creatorUserId: number

  @belongsTo(() => User, {
    foreignKey: 'creatorUserId',
  })
  public creatorUser: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @manyToMany(() => User, {
    pivotTable: 'favorites',
  })
  public favorites: ManyToMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'post_like',
  })
  public usersLike: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async favorited(user: User) {
    const post = await Post.query()
      .where('id', this.id)
      .preload('favorites', (favoriteQuery) => {
        favoriteQuery.where('user_id', user.id)
      })
      .first()

    return post?.$preloaded.favorites[0] ? true : false
  }

  public async liked(user: User) {
    const post = await Post.query()
      .where('id', this.id)
      .preload('usersLike', (likeQuery) => {
        likeQuery.where('user_id', user.id)
      })
      .first()

    return post?.$preloaded.usersLike[0] ? true : false
  }
}
