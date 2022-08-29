import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

import { VideoRoom } from './features/video-room/index.js';

export default Arena.default({
  getId: () => 'FilmTab Server',

  beforeListen: () => {},

  initializeGameServer: (gameServer) => {
    gameServer.define('video-room', VideoRoom);
  },

  initializeExpress: (app) => {
    app.use('/monitor', monitor());

    app.get('/', (req, res) => {
      res.send('FilmTab Server');
    });
  },
});
