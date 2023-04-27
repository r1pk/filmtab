import { Schema, defineTypes } from '@colyseus/schema';

import { User } from './User.js';

export class ChatMessage extends Schema {
  constructor() {
    super();

    this.id = '';
    this.content = '';
    this.createdAt = 0;
    this.author = new User();
  }
}

defineTypes(ChatMessage, {
  id: 'string',
  content: 'string',
  createdAt: 'number',
  author: User,
});
