import * as Colyseus from 'colyseus.js';

import { ColyseusChatModule } from '../features/chat';
import { ColyseusNotificationModule } from '../features/notifications';
import { ColyseusAffiliationModule } from '../features/affiliation';
import { ColyseusUsersModule } from '../features/users';
import { ColyseusVideoModule } from '../features/video';

import { actions as notifications } from '../features/notifications';

export const colyseusMediator = (store) => {
  const modules = [];
  const colyseus = {
    client: new Colyseus.Client(process.env.REACT_APP_COLYSEUS_ENDPOINT),
    _roomInstance: null,
    roomInstanceSubscribers: [],

    set roomInstance(instance) {
      this._roomInstance = instance;
      this.roomInstanceSubscribers.forEach((subscriber) => subscriber(instance));
    },

    get roomInstance() {
      return this._roomInstance;
    },
  };

  modules.push(new ColyseusAffiliationModule(colyseus, store));
  modules.push(new ColyseusVideoModule(colyseus, store));
  modules.push(new ColyseusUsersModule(colyseus, store));
  modules.push(new ColyseusChatModule(colyseus, store));
  modules.push(new ColyseusNotificationModule(colyseus, store));

  const actions = modules.reduce((actions, module) => ({ ...actions, ...module.getModuleActions() }), {});

  return (next) => async (action) => {
    if (Object.prototype.hasOwnProperty.call(actions, action.type)) {
      try {
        const result = await actions[action.type](action.payload);

        return next(result || action);
      } catch (error) {
        const message = error.message || 'Something went wrong.';

        store.dispatch(notifications.addNotification('error', message));
      }
    }

    return next(action);
  };
};
