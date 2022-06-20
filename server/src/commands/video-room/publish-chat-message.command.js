import { Command } from '@colyseus/command';

import { ChatMessage } from '../../schemas/video-room.schemas.js';

import { getTimestamp } from '../../utils/get-timestamp.js';
import { normalizeMessageContent } from '../../utils/normalize-message-content.js';
import { getUniqueId } from '../../utils/get-unique-id.js';

export class PublishChatMessageCommand extends Command {
  validate({ sessionId }) {
    return this.state.users.has(sessionId);
  }

  execute({ sessionId, content }) {
    const normalizedMessageContent = normalizeMessageContent(content);
    const chatMessage = new ChatMessage().assign({
      id: getUniqueId(),
      timestamp: getTimestamp(),
      author: this.state.users.get(sessionId),
      content: normalizedMessageContent,
    });

    this.room.broadcast('chat::message', chatMessage);
  }
}
