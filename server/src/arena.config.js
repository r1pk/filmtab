import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

import { VideoRoom } from './rooms/VideoRoom.js';

export default Arena.default({
  getId: () => 'FilmTab Backend',

  initializeGameServer: (gameServer) => {
    gameServer.define('video_room', VideoRoom);
  },

  initializeExpress: (app) => {
    app.get('/', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    app.use('/colyseus', monitor());
  },

  beforeListen: () => {},
});
