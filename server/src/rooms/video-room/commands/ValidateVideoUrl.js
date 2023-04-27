import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateVideoUrl extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ url }) {
    Joi.attempt(url, Joi.string().trim().uri().required().label('url'), { convert: false });
  }
}
