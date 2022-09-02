import { Command } from '@colyseus/command';

export class ClearRequests extends Command {
  execute({ requestType }) {
    this.state.requests.set(requestType, []);
  }
}
