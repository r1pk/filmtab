import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateChatMessageContent extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ content }) {
    Joi.attempt(content, Joi.string().trim().min(1).max(140).required().label('content'), {
      convert: false,
    });
  }
}
