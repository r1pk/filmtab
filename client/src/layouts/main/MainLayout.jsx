import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import FixedBackground from './FixedBackground';

const MainLayout = () => {
  return (
    <Box sx={{ p: 2 }}>
      <FixedBackground />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
