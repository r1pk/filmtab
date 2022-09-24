import { Command } from '@colyseus/command';

export class ValidateSyncVideoProgressRequest extends Command {
  execute() {
    if (this.state.users.size < 2) {
      throw new Error('Not enough users to request sync video progress');
    }
  }
}
