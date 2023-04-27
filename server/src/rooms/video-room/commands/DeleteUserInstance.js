import { Command } from '@colyseus/command';

export class DeleteUserInstance extends Command {
  execute({ userId }) {
    this.state.users.delete(userId);
  }
}
