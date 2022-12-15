import ColyseusClient from './lib/Client';

import RoomManagementModule from './modules/RoomManagementModule';
import VideoManagementModule from './modules/VideoManagementModule';
import ChatManagementModule from './modules/ChatManagementModule';

export const middleware = (store) => {
  const client = new ColyseusClient(import.meta.env.VITE_COLYSEUS_URL);

  const modules = [
    new RoomManagementModule(client, store),
    new VideoManagementModule(client, store),
    new ChatManagementModule(client, store),
  ];

  client.onRoomChange = (room) => {
    modules.forEach((module) => module.handleRoomChange(room));
  };

  const availableActions = modules.reduce((actions, module) => ({ ...actions, ...module.getModuleActions() }), {});

  return (next) => async (action) => {
    if (Object.prototype.hasOwnProperty.call(availableActions, action.type)) {
      try {
        const result = await availableActions[action.type](action);

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
