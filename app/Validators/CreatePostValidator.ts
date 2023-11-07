import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class CreatePostValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  public schema = schema.create({
    title: schema.string([rules.minLength(5), rules.maxLength(200), rules.trim()]),
    content: schema.string([rules.minLength(5), rules.maxLength(200), rules.trim()]),
  })

  public messages: CustomMessages = {
    ...this.messages,
  }
}
