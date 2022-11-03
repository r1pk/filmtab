import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import FixedBackground from './FixedBackground';

const MainLayout = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <FixedBackground />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
