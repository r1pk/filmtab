import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

import basicAuth from 'express-basic-auth';

import { VideoRoom } from './rooms/video-room.class.js';

export default Arena.default({
  getId: () => 'FilmTab Server',

  initializeGameServer: (gameServer) => {
    gameServer.define('video-room', VideoRoom);
  },

  initializeExpress: (app) => {
    const { MONITOR_ADMIN_USERNAME, MONITOR_ADMIN_PASSWORD } = process.env;

    if (MONITOR_ADMIN_USERNAME && MONITOR_ADMIN_PASSWORD) {
      const basicAuthMiddleware = basicAuth({
        users: {
          [MONITOR_ADMIN_USERNAME]: MONITOR_ADMIN_PASSWORD,
        },
        challenge: true,
      });

      app.use('/colyseus', basicAuthMiddleware, monitor());
    }

    app.get('/', (req, res) => {
      res.send('Its time to kick ass and chew bubblegum!');
    });
  },

  beforeListen: () => {},
});
