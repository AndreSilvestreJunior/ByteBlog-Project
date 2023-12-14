import ToastService from 'App/Services/ToastService'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'

export default class UsersController {
  constructor(private toastService: ToastService) {
    this.toastService = new ToastService()
  }

  public async index({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/users/index', { user })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/users/create')
  }

  public async store({ request, response, session }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    await User.create(payload)
    this.toastService.success(session, 'Conta criada, favor efetuar login!', 4000)
    return response.redirect().toRoute('login.show')
  }

  public async show({}: HttpContextContract) {}

  public async edit({ view }: HttpContextContract) {
    return view.render('pages/users/edit')
  }

  public async update({ params, request, response, session }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const { username, name, lastName, email } = await request.validate(UpdateUserValidator)

    user.username = username ? username : user.username
    user.name = name ? name : user.name
    user.lastName = lastName ? lastName : user.lastName
    user.email = email ? email : user.email

    await user.save()

    this.toastService.success(session, 'Usuário atualizado!', 4000)
    return response.redirect().back()
  }

  public async updatePassword({ params, request, response, session }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const { password } = await request.validate(UpdatePasswordValidator)

    user.password = password ? password : user.password

    await user.save()

    this.toastService.success(session, 'Senha atualizada!', 4000)
    return response.redirect().back()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    return null
  }
}
