import * as Colyseus from 'colyseus.js';

import * as room from '../actions/room';
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

  const onAddRoomUser = (user, sessionId) => {
    store.dispatch(room.addUser(user, sessionId));
  };
  const onRemoveRoomUser = (user, sessionId) => {
    store.dispatch(room.removeUser(sessionId));
  };
  const onVideoStateChange = (updatedState) => {
    store.dispatch(room.updateVideoState(updatedState));
  };
  const onCurrentPlayedSecondsMessage = ({ currentPlayedSeconds, updateTimestamp }) => {
    store.dispatch(room.updatePlayedSeconds(currentPlayedSeconds, updateTimestamp));
  };
  const onErrorHandler = (code, message) => {
    store.dispatch(notifications.addNotification('error', message));
  };
  const onLeaveHandler = () => {
    colyseus.room.removeAllListeners();
  };

  const setupListeners = () => {
    colyseus.room.state.users.onAdd = onAddRoomUser;
    colyseus.room.state.users.onRemove = onRemoveRoomUser;
    colyseus.room.state.video.onChange = (changes) => {
      const updatedState = changes.reduce((state, change) => ({ ...state, [change.field]: change.value }), {});
      onVideoStateChange(updatedState);
    };

    colyseus.room.onError(onErrorHandler);
    colyseus.room.onLeave(onLeaveHandler);

    colyseus.room.onMessage('video::currentPlayedSeconds', onCurrentPlayedSecondsMessage);
  };

  return (next) => async (action) => {
    try {
      switch (action.type) {
        case room.JOIN_ROOM: {
          const { roomId, username } = action.payload;
          colyseus.room = await colyseus.client.joinById(roomId, { username });
          setupListeners();

          return next(enhanceActionPayload(action));
        }
        case room.CREATE_ROOM: {
          const { isRoomPrivate, username } = action.payload;
          colyseus.room = await colyseus.client.create('video-room', { private: isRoomPrivate, username });
          setupListeners();

          return next(enhanceActionPayload(action));
        }
        case room.LEAVE_ROOM: {
          await colyseus.room.leave(true);

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
