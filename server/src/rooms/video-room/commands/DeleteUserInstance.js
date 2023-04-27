import { Command } from '@colyseus/command';

export class DeleteUserInstance extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute({ userId }) {
    this.state.users.delete(userId);
  }
}
