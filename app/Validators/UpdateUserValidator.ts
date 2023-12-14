import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class CreateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.unique({
        table: 'users',
        column: 'username',
        whereNot: { id: this.ctx.auth.user?.id },
      }),
    ]),
    name: schema.string({ trim: true }, [rules.minLength(3)]),
    lastName: schema.string({ trim: true }, [rules.minLength(3)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.ctx.auth.user?.id } }),
    ]),
  })

  public messages: CustomMessages = {
    ...this.messages,
  }
}
