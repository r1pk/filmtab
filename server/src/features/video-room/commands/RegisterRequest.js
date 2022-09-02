import { Command } from '@colyseus/command';

export class RegisterRequest extends Command {
  execute({ requestType, userId }) {
    this.state.requests.get(requestType).push(userId);
  }
}
