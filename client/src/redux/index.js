import { actions as chat } from './slices/chat';
import { actions as room } from './slices/room';
import { actions as session } from './slices/session';

export { store } from './store';
export const actions = {
  chat,
  room,
  session,
};
