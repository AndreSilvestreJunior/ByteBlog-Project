import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class CommentsController {
  public async index({ params, response }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    const comments = await post
      .related('comments')
      .query()
      .preload('user')
      .preload('replies', (replyLoader) => {
        replyLoader.preload('user').withCount('usersLike')
      })
      .withCount('usersLike')

    response.status(200).send({ comments })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
