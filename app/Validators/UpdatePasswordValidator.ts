import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class CreateUserValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    password: schema.string({ trim: true }, [rules.minLength(8), rules.confirmed()]),
  })

  public messages: CustomMessages = {
    ...this.messages,
  }
}
