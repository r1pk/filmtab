import { Command } from '@colyseus/command';

export class DeleteUserInstance extends Command {
  execute({ id }) {
    this.state.users.delete(id);
  }
}
