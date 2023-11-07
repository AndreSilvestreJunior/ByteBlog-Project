import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('', user)
  }

  public async create({ view }: HttpContextContract) {
    return view.render('register')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    await User.create(payload)

    return response.redirect().toRoute('welcome')
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const username = request.input('username', undefined)
    const name = request.input('name', undefined)
    const lastName = request.input('lastName', undefined)
    const email = request.input('email', undefined)
    const password = request.input('password', undefined)

    user.username = username ? username : user.username
    user.name = name ? name : user.name
    user.lastName = lastName ? lastName : user.lastName
    user.email = email ? email : user.email
    user.password = password ? password : user.password

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return null
  }
}
