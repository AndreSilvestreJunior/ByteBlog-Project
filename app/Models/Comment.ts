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
import Reply from './Reply'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public postId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Reply)
  public replies: HasMany<typeof Reply>

  @manyToMany(() => User, {
    pivotTable: 'comment_like',
  })
  public usersLike: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async liked(user: User) {
    const comment = await Comment.query()
      .where('id', this.id)
      .preload('usersLike', (likeQuery) => {
        likeQuery.where('user_id', user.id)
      })
      .first()

    return comment?.$preloaded.usersLike[0] ? true : false
  }
}
