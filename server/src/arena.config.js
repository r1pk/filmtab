import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

import { MyRoom } from './rooms/MyRoom.js';

export default Arena.default({
  getId: () => 'Your Colyseus App',

  initializeGameServer: (gameServer) => {
    gameServer.define('my_room', MyRoom);
  },

  initializeExpress: (app) => {
    app.get('/', (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    app.use('/colyseus', monitor());
  },

  beforeListen: () => {},
});
