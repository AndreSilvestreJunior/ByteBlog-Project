import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import ToastService from 'App/Services/ToastService'

export default class AuthController {
  private toastService = new ToastService()

  public async view({ view }) {
    return view.render('login')
  }

  public async auth({ request, response, session, auth }: HttpContextContract) {
    const authSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }, [rules.minLength(8)]),
    })

    const payload = await request.validate({
      schema: authSchema,
      messages: {
        required: 'Campo Obrigatório!',
        email: 'Email inválido!',
        minLength: 'A {{ field }} deve conter pelo menos 8 caracteres.',
      },
    })

    const user = await User.findBy('email', payload.email)

    if (user) {
      if (await Hash.verify(user.password, payload.password)) {
        await auth.attempt(payload.email, payload.password)
        this.toastService.success(session, 'Login efetuado!', 4000)
        return response.redirect().toRoute('welcome')
      }
    }

    this.toastService.error(session, 'Email ou senha incorreto!', 4000)
    session.flash(payload)
    return response.redirect().back()
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    auth.logout()

    this.toastService.success(session, 'Logout efetuado!', 4000)
    return response.redirect().toRoute('login.show')
  }
}
