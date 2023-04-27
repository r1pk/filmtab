import { Command } from '@colyseus/command';

import { nanoid } from 'nanoid';

import { ChatMessage } from '../schemas/ChatMessage.js';

export class BroadcastChatMessage extends Command {
  execute({ userId, content }) {
    const chatMessage = new ChatMessage().assign({
      id: nanoid(),
      content: content,
      createdAt: new Date().getTime(),
      author: this.state.users.get(userId),
    });

    this.room.broadcast('chat::message', chatMessage);
  }
}
