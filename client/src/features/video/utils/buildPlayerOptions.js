import { options } from '../defaults/options';

export const buildPlayerOptions = (listeners = {}) => {
  return {
    ...options,
    listeners: {
      ...options.listeners,
      ...listeners,
    },
  };
};
