import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Room from './pages/Room';

import { RequireRoomMembershipContainer } from './features/room';

const FilmTabRouting = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="rooms" element={<RequireRoomMembershipContainer />}>
            <Route path=":roomId" element={<Room />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default FilmTabRouting;
