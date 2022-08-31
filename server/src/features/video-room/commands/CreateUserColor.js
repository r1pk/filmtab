import { Command } from '@colyseus/command';

export class CreateUserColor extends Command {
  execute({ id, username }) {
    const value = username.split('').reduce((p, c) => (p += c.charCodeAt(0)), 0);

    const hue = (value * 137.5) % 360;
    const saturation = 70;
    const lightness = 75;

    this.state.users.get(id).color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
