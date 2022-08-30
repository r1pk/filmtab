import { Command } from '@colyseus/command';

import Joi from 'joi';

export class ValidateVideoUrl extends Command {
  execute({ url }) {
    Joi.attempt(url, Joi.string().uri().required().label('url'));
  }
}
