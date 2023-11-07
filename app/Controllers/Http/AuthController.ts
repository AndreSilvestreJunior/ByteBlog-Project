import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import ToastService from 'App/Services/ToastService'

export default class AuthController {
  private toastService = new ToastService()

  public async view({ view }) {
    return view.render('login')
  }

  public async auth({ request, response, session }: HttpContextContract) {
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

    const user = await User.query()
      .where('email', payload.email)
      .andWhere('password', payload.password)

    if (user.length === 0) {
      this.toastService.error(session, 'Email ou senha incorreto!', 4000)
      session.flash(payload)
      return response.redirect().back()
    }

    this.toastService.success(session, 'Login efetuado!', 4000)
    return response.redirect().toRoute('welcome')
  }

  public async create({ view }) {
    return view.render('login')
  }
}
