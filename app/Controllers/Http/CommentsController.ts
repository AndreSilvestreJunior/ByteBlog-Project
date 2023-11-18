import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class CommentsController {
  public async index({}: HttpContextContract) {}

  public async create({ request, response, auth, params }: HttpContextContract) {
    const content = request.input('comment')
    const postId = params.id

    const post = await Post.findByOrFail('id', postId)

    if (auth.user?.id)
      await post.related('comments').create({ content, userId: auth.user?.id, postId })

    response.redirect().back()
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
