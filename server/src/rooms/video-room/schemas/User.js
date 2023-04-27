import { Schema, defineTypes } from '@colyseus/schema';

export class User extends Schema {
  constructor() {
    super();

    this.id = '';
    this.username = '';
    this.color = '';
  }
}

defineTypes(User, {
  id: 'string',
  username: 'string',
  color: 'string',
});
