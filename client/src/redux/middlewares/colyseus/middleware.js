import EnhancedColyseusClient from './clients/EnhancedColyseusClient';

import RoomManagementModule from './modules/RoomManagementModule';

export const middleware = (store) => {
  const client = new EnhancedColyseusClient(import.meta.env.VITE_COLYSEUS_URL);

  const modules = [new RoomManagementModule(client, store)];
  const actions = modules.reduce((actions, module) => ({ ...actions, ...module.getModuleActions() }), {});

  return (next) => async (action) => {
    if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
      try {
        const result = await actions[action.type](action);

        return next(result);
      } catch (error) {}
    } else {
      return next(action);
    }
  };
};
