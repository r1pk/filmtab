import { Outlet } from 'react-router-dom';

import { Container, GlobalStyles } from '@mui/material';

const MainLayout = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Outlet />
      <GlobalStyles
        styles={(theme) => ({
          body: {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundImage: 'url(/assets/background_9-16.svg)',

            [theme.breakpoints.up('md')]: {
              backgroundImage: 'url(/assets/background_16-9.svg)',
            },
          },
        })}
      />
    </Container>
  );
};

export default MainLayout;
