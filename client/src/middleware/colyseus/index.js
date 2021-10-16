import * as room from '../../actions/room';
import * as server from '../../actions/server';

import FilmTabColyseus from './FilmTabColyseus';

export const colyseusMiddleware = (store) => {
  const colyseus = new FilmTabColyseus(process.env.REACT_APP_COLYSEUS_ENDPOINT);

  const stateChangeHandler = (state) => {
    store.dispatch(room.updateRoomState(state));
  };

  const enhanceActionPayload = (action) => {
    return {
      ...action,
      payload: {
        ...action.payload,
        roomId: colyseus.roomId,
        sessionId: colyseus.sessionId,
      },
    };
  };

  const runMiddlewareHandler = async (handlers, action) => {
    const handler = handlers[action.type];
    if (handler) {
      return (await handler(action)) || action;
    }
    return action;
  };

  const middlewareHandlers = {
    [server.JOIN_ROOM]: async (action) => {
      await colyseus.joinRoom(action.payload.roomId, action.payload.username);
      colyseus.addStateChangeListener(stateChangeHandler);

      return enhanceActionPayload(action);
    },
    [server.CREATE_ROOM]: async (action) => {
      await colyseus.createRoom(action.payload.isRoomPrivate, action.payload.username);
      colyseus.addStateChangeListener(stateChangeHandler);

      return enhanceActionPayload(action);
    },

    [room.SEND_USER_STATUS]: async (action) => {
      await colyseus.sendUserStatus(action.payload.status);
    },
    [room.SET_VIDEO]: async (action) => {
      await colyseus.setVideo(action.payload.url);
    },
    [room.PLAY_VIDEO]: async (action) => {
      await colyseus.playVideo(action.payload.playedSeconds);
    },
    [room.PAUSE_VIDEO]: async (action) => {
      await colyseus.pauseVideo(action.payload.playedSeconds);
    },
    [room.SEEK_VIDEO]: async (action) => {
      await colyseus.seekVideo(action.payload.playedSeconds);
    },
  };

  return (next) => async (action) => {
    try {
      const resultAction = await runMiddlewareHandler(middlewareHandlers, action);
      return next(resultAction);
    } catch (err) {
      console.error('Caught an exception!', err);
    }
  };
};
