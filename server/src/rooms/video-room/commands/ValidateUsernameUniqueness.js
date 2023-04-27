import { Command } from '@colyseus/command';

export class ValidateUsernameUniqueness extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ username }) {
    for (const user of this.state.users.values()) {
      if (user.username === username) {
        throw new Error(`Username "${username}" is already taken.`);
      }
    }
  }
}
