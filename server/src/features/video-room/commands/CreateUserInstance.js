import { Command } from '@colyseus/command';

import { User } from '../schemas/User.js';

export class CreateUserInstance extends Command {
  execute({ id, username }) {
    const user = new User().assign({
      id: id,
      username: username,
      color: 'hsl(0, 70%, 75%)',
    });

    this.state.users.set(id, user);
  }
}
