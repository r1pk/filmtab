import { Outlet, Link, useLocation } from 'react-router-dom';

import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const HomePage = () => {
  const location = useLocation();

  useDocumentTitle('Home');

  return (
    <Grid container columns={16} spacing={2} sx={{ justifyContent: 'center' }}>
      <Grid item xs={16} sm={12} md={8} lg={6}>
        <Paper>
          <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
            {import.meta.env.VITE_BASE_APP_TITLE}
          </Typography>
          <Paper elevation={2}>
            <Tabs centered value={location.pathname}>
              <Tab label="Create Room" value="/create-room" to="/create-room" component={Link} />
              <Tab label="Join Room" value="/join-room" to="/join-room" component={Link} />
            </Tabs>
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={16}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default HomePage;
