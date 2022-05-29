import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Room from './pages/Room';

const FilmTabRouting = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="rooms">
          <Route path=":roomId" element={<Room />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default FilmTabRouting;
