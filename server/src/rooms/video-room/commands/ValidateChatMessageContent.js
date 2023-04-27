import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateChatMessageContent extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ content }) {
    Joi.attempt(content, Joi.string().trim().min(1).max(140).required().label('content'), {
      convert: false,
    });
  }
}
