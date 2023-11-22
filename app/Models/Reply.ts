import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Reply extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public commentId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'reply_like',
  })
  public usersLike: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async liked(user: User) {
    const reply = await Reply.query()
      .where('id', this.id)
      .preload('usersLike', (likeQuery) => {
        likeQuery.where('user_id', user.id)
      })
      .first()

    return reply?.$preloaded.usersLike[0] ? true : false
  }
}
