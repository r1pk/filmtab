import { Command } from '@colyseus/command';

import { User } from '../schemas/User.js';

export class CreateUserInstance extends Command {
  execute({ userId, username }) {
    const user = new User().assign({
      id: userId,
      username: username,
      color: 'hsl(0, 70%, 75%)',
    });

    this.state.users.set(userId, user);
  }
}
