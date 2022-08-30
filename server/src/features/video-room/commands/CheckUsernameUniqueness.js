import { Command } from '@colyseus/command';

export class CheckUsernameUniqueness extends Command {
  execute({ users, username }) {
    for (const user of users) {
      if (user.username === username) {
        throw new Error(`Username "${username}" is already taken.`);
      }
    }
  }
}
