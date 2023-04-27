import { Command } from '@colyseus/command';

export class ValidateVideoProgressRequest extends Command {
  validate({ enabled = true }) {
    return enabled;
  }

  execute() {
    if (this.state.users.size < 2) {
      throw new Error('Not enough users to request video progress');
    }
  }
}
