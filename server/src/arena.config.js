import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';
import expressBasicAuth from 'express-basic-auth';

import { VideoRoom } from './features/video-room/index.js';

export default Arena.default({
  getId: () => 'FilmTab Server',

  beforeListen: () => {},

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
