import * as Colyseus from 'colyseus.js';

import * as room from '../actions/room';
import * as server from '../actions/server';
import * as notifications from '../actions/notifications';

export const colyseusMiddleware = (store) => {
  const colyseus = {
    client: new Colyseus.Client(process.env.REACT_APP_COLYSEUS_ENDPOINT),
    room: null,
  };

  const enhanceActionPayload = (action) => {
    return {
      ...action,
      payload: {
        ...action.payload,
        roomId: colyseus.room.id,
        sessionId: colyseus.room.sessionId,
      },
    };
  };

  const stateChangeHandler = (state) => {
    store.dispatch(room.updateRoomState(state));
  };
  const playedSecondsChangeHandler = ({ playedSeconds }) => {
    store.dispatch(room.updatePlayedSeconds(playedSeconds));
  };

  return (next) => async (action) => {
    try {
      switch (action.type) {
        case server.JOIN_ROOM: {
          const { roomId, username } = action.payload;
          colyseus.room = await colyseus.client.joinById(roomId, { username });

          colyseus.room.onStateChange.once(stateChangeHandler);
          colyseus.room.onStateChange(stateChangeHandler);
          colyseus.room.onMessage('video::playedSeconds', playedSecondsChangeHandler);

          return next(enhanceActionPayload(action));
        }
        case server.CREATE_ROOM: {
          const { isRoomPrivate, username } = action.payload;
          colyseus.room = await colyseus.client.create('video-room', { private: isRoomPrivate, username });

          colyseus.room.onStateChange.once(stateChangeHandler);
          colyseus.room.onStateChange(stateChangeHandler);
          colyseus.room.onMessage('video::playedSeconds', playedSecondsChangeHandler);

          return next(enhanceActionPayload(action));
        }

        case room.SEND_USER_STATUS: {
          const { status = true } = action.payload;
          await colyseus.room.send('user::status', { status });

          return next(action);
        }
        case room.SET_VIDEO: {
          const { url } = action.payload;
          await colyseus.room.send('video::set', { url });

          return next(action);
        }
        case room.PLAY_VIDEO: {
          const { playedSeconds } = action.payload;
          await colyseus.room.send('video::play', { playedSeconds });

          return next(action);
        }
        case room.PAUSE_VIDEO: {
          const { playedSeconds } = action.payload;
          await colyseus.room.send('video::pause', { playedSeconds });

          return next(action);
        }
        case room.SEEK_VIDEO: {
          const { playedSeconds } = action.payload;
          await colyseus.room.send('video::seek', { playedSeconds });

          return next(action);
        }
        default:
          return next(action);
      }
    } catch (error) {
      store.dispatch(notifications.addNotification('error', error.message));
    }
  };
};
