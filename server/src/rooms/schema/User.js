import { Schema, defineTypes } from '@colyseus/schema';

export class User extends Schema {}

defineTypes(User, {
  name: 'string',
});
