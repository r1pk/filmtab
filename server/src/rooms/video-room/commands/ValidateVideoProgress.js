import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateVideoProgress extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ progress }) {
    Joi.attempt(progress, Joi.number().min(0).strict().required().label('progress'));
  }
}
