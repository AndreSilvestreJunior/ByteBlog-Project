import ToastService from 'App/Services/ToastService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import fs from 'fs'
import User from 'App/Models/User'

export default class PostsController {
  constructor(private toastService: ToastService) {
    this.toastService = new ToastService()
  }

  public async index({ view, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const file = fs.readFileSync('resources/emojis/emojis.json', 'utf-8')

    const emojis = JSON.parse(file)

    await post.load('creatorUser')
    await post.loadCount('usersLike')
    const comments = await post.related('comments').query().preload('user')

    return view.render('pages/posts/index', { post, comments, emojis })
  }

  public async favorite({ view, auth }: HttpContextContract) {
    if (auth.user?.id) {
      const user = await User.query()
        .where('id', auth.user.id)
        .preload('favorites', (favoritesQuery) => {
          favoritesQuery.withCount('usersLike').preload('creatorUser')
        })
        .firstOrFail()

      return view.render('pages/posts/favorite', { posts: user.favorites })
    }
  }

  public async createFavorite({ params, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    if (auth.user?.id) {
      const user = await User.findOrFail(auth.user.id)

      if (await post.favorited(user)) {
        await user.related('favorites').detach([post.id])

        return { favorited: false }
      } else {
        await user.related('favorites').attach([post.id])

        return { favorited: true }
      }
    }
  }

  public async like({ params, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    if (auth.user?.id) {
      const user = await User.findOrFail(auth.user.id)

      if (await post.liked(user)) {
        await user.related('postsLike').detach([post.id])

        return { liked: false }
      } else {
        await user.related('postsLike').attach([post.id])

        return { liked: true }
      }
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
        .withCount('usersLike')
    else {
      posts = await Post.query().preload('creatorUser').withCount('comments').withCount('usersLike')
    }

    return view.render('pages/posts/myShow', { posts })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
