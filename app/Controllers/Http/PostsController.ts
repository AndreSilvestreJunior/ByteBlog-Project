import ToastService from 'App/Services/ToastService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import Favorite from 'App/Models/Favorite'
import fs from 'fs'
import Comment from 'App/Models/Comment'

export default class PostsController {
  constructor(private toastService: ToastService) {
    this.toastService = new ToastService()
  }

  public async index({ view, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const file = fs.readFileSync('resources/emojis/emojis.json', 'utf-8')

    const emojis = JSON.parse(file)

    await post.load('creatorUser')
    const comments = await post.related('comments').query().preload('user')

    return view.render('pages/posts/index', { post, comments, emojis })
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
      posts = await Post.query()
        .where('creatorUserId', params.id)
        .preload('creatorUser')
        .withCount('comments')
    else {
      posts = await Post.query().preload('creatorUser').withCount('comments')
    }

    return view.render('pages/posts/myShow', { posts })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
