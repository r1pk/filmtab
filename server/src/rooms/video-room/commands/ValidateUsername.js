import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateUsername extends Command {
  execute({ username }) {
    Joi.attempt(username, Joi.string().trim().alphanum().min(3).max(20).required().label('username'), {
      convert: false,
    });
  }
}
