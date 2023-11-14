import ToastService from 'App/Services/ToastService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import Favorite from 'App/Models/Favorite'
import EmojiService from 'App/Services/EmojiService'

export default class PostsController {
  constructor(
    private toastService: ToastService,
    private emojiService: EmojiService
  ) {
    this.toastService = new ToastService()
    this.emojiService = new EmojiService()
  }

  public async index({ view, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const emojis = await this.emojiService.loadEmoji()

    await post.load('creatorUser')

    return view.render('pages/posts/index', { post, emojis })
  }

  public async favorite({ view, auth }: HttpContextContract) {
    if (auth.user?.id) {
      const posts = await Favorite.query().where('userId', auth.user.id).preload('posts')
      return view.render('pages/posts/favorite', { posts })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response, auth, session }: HttpContextContract) {
    if (!auth.isAuthenticated) {
      response.status(401)
    }

    const payload = await request.validate(CreatePostValidator)

    await Post.create({ ...payload, creatorUserId: auth.user?.id })

    this.toastService.success(session, 'Postagem realizada!', 4000)
    return response.redirect().back()
  }

  public async show({ params, view }: HttpContextContract) {
    let posts

    if (params.id)
      posts = await Post.query().where('creatorUserId', params.id).preload('creatorUser')
    else posts = await Post.query().preload('creatorUser')

    return view.render('pages/posts/myShow', { posts })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
