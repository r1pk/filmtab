import config from '@colyseus/tools';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { monitor } from '@colyseus/monitor';
import expressBasicAuth from 'express-basic-auth';

import { VideoRoom } from './rooms/video-room/VideoRoom.js';

export default config.default({
  getId: () => 'FilmTab Server',

  beforeListen: () => {},

  initializeTransport: (options) => {
    return new WebSocketTransport(options);
  },

  initializeGameServer: (gameServer) => {
    gameServer.define('video-room', VideoRoom);
  },

  initializeExpress: (app) => {
    const auth = expressBasicAuth({
      users: {
        admin: process.env.COLYSEUS_MONITOR_PASSWORD,
      },
      challenge: true,
    });

    app.use('/monitor', auth, monitor());

    app.get('/', (req, res) => {
      res.send('FilmTab Server');
    });
  },
});
