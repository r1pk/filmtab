import { Command } from '@colyseus/command';

import Joi from 'joi';
import WebVTT from 'node-webvtt';

export class ValidateVideoSubtitles extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ subtitles }) {
    Joi.attempt(subtitles, Joi.string().required().label('subtitles'));
    WebVTT.parse(subtitles);
  }
}
