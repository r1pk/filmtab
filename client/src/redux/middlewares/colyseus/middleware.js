import EnhancedColyseusClient from './clients/EnhancedColyseusClient';

import RoomManagementModule from './modules/RoomManagementModule';
import VideoManagementModule from './modules/VideoManagementModule';
import ChatManagementModule from './modules/ChatManagementModule';

export const middleware = (store) => {
  const client = new EnhancedColyseusClient(import.meta.env.VITE_COLYSEUS_URL);

  const modules = [
    new RoomManagementModule(client, store),
    new VideoManagementModule(client, store),
    new ChatManagementModule(client, store),
  ];
  const actions = modules.reduce((actions, module) => ({ ...actions, ...module.getModuleActions() }), {});

  return (next) => async (action) => {
    if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
      try {
        const result = await actions[action.type](action);

        if (result) {
          return next(result);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return next(action);
    }
  };
};
