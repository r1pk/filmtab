import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateVideoUrl extends Command {
  execute({ url }) {
    Joi.attempt(url, Joi.string().trim().uri().required().label('url'), { convert: false });
  }
}
