import Arena from '@colyseus/arena';
import { monitor } from '@colyseus/monitor';

export default Arena.default({
  getId: () => 'FilmTab Server',

  beforeListen: () => {},

  initializeGameServer: (gameServer) => {},

  initializeExpress: (app) => {
    app.use('/monitor', monitor());

    app.get('/', (req, res) => {
      res.send('FilmTab Server');
    });
  },
});
