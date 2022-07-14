import { Command } from '@colyseus/command';

import { parse } from 'node-webvtt';

export class ValidateVTTSubtitlesCommand extends Command {
  execute({ subtitles }) {
    if (subtitles === undefined || subtitles === null) {
      throw new Error('Subtitles must be provided!');
    }

    try {
      const { valid } = parse(subtitles);

      if (!valid) {
        throw new Error('Provided WebVTT subtitles are invalid!');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
