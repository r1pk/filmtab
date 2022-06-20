import { Command } from '@colyseus/command';

import { normalizeUsername } from '../../utils/normalize-username.js';

export class ValidateUsernameCommand extends Command {
  execute({ username }) {
    if (username === undefined || username === null) {
      throw new Error('Username must be provided!');
    }

    const normalizedUsername = normalizeUsername(username);
    const users = this.state.users.values();

    if (normalizedUsername.length < 3) {
      throw new Error('Username must be at least 3 characters long!');
    }

    for (let user of users) {
      if (normalizedUsername === user.name) {
        throw new Error('Username is already taken!');
      }
    }
  }
}
