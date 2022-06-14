import { Command } from '@colyseus/command';

import { normalizeMessageContent } from '../../utils/normalize-message-content.js';

export class ValidateMessageContentCommand extends Command {
  execute({ content }) {
    const normalizedMessageContent = normalizeMessageContent(content);

    if (normalizedMessageContent.length < 1) {
      throw new Error('Message must have at least one character!');
    }

    if (normalizedMessageContent.length > 140) {
      throw new Error('The length of message is too long. The maximum length is 140!');
    }
  }
}
