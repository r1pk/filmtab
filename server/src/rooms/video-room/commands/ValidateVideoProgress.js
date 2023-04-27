import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateVideoProgress extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ progress }) {
    Joi.attempt(progress, Joi.number().min(0).strict().required().label('progress'));
  }
}
