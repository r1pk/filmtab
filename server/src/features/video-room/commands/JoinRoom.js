import { Command } from '@colyseus/command';

import { User } from '../schemas/User.js';

import { createUserColor } from '../utils/createUserColor.js';

export class JoinRoom extends Command {
  execute({ id, username }) {
    const user = new User().assign({
      id: id,
      username: username,
      color: createUserColor(username, 0.7, 0.75),
    });

    this.state.users.set(id, user);
  }
}
