import * as room from '../../actions/room';
import * as server from '../../actions/server';

import FilmTabColyseus from './FilmTabColyseus';

export const colyseusMiddleware = (store) => {
  const colyseus = new FilmTabColyseus(process.env.REACT_APP_COLYSEUS_ENDPOINT);

  const onStateUpdateHandler = (state) => {
    store.dispatch(room.updateRoomState(state));
  };

  return (next) => async (action) => {
    try {
      switch (action.type) {
        case server.JOIN_ROOM: {
          await colyseus.joinRoom(action.payload.roomId, action.payload.username, onStateUpdateHandler);
          return next(action);
        }
        case server.CREATE_ROOM: {
          await colyseus.createRoom(action.payload.isRoomPrivate, action.payload.username, onStateUpdateHandler);
          return next(action);
        }

        case room.SET_VIDEO: {
          await colyseus.setVideo(action.payload.url);
          return next(action);
        }
        case room.PLAY_VIDEO: {
          await colyseus.playVideo(action.payload.playedSeconds);
          return next(action);
        }
        case room.PAUSE_VIDEO: {
          await colyseus.pauseVideo(action.payload.playedSeconds);
          return next(action);
        }
        case room.SEEK_VIDEO: {
          await colyseus.seekVideo(action.payload.playedSeconds);
          return next(action);
        }

        default: {
          return next(action);
        }
      }
    } catch (err) {
      console.error('Caught an exception!', err);
    }
  };
};
