import { Command } from '@colyseus/command';

export class DeleteUserInstance extends Command {
  validate(payload = {}) {
    return payload.enabled ?? true;
  }

  execute({ userId }) {
    this.state.users.delete(userId);
  }
}
