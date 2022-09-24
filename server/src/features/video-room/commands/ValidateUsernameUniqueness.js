import { Command } from '@colyseus/command';

export class ValidateUsernameUniqueness extends Command {
  execute({ username }) {
    for (const user of this.state.users.values()) {
      if (user.username === username) {
        throw new Error(`Username "${username}" is already taken.`);
      }
    }
  }
}
