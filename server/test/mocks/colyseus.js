import { nanoid } from 'nanoid';

export class Client {
  constructor() {
    this.sessionId = nanoid(8);
  }
  send() {}
}
