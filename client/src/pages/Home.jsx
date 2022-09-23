import { Outlet, Link, useLocation } from 'react-router-dom';

import { Box, Grid, Paper, Typography, Tabs, Tab } from '@mui/material';

import { useDocumentTitle } from '@/hooks';

const Home = () => {
  const location = useLocation();

  useDocumentTitle('Home');

  return (
    <Box>
      <Grid container columns={16} sx={{ justifyContent: 'center' }}>
        <Grid item xs={16} sm={12} md={8} lg={6}>
          <Paper>
            <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
              FilmTab
            </Typography>
            <Paper elevation={2}>
              <Tabs centered value={location.pathname}>
                <Tab label="Create Room" value="/create-room" to="/create-room" component={Link} />
                <Tab label="Join Room" value="/join-room" to="/join-room" component={Link} />
              </Tabs>
            </Paper>
          </Paper>
        </Grid>
      </Grid>

      <Grid container columns={16} sx={{ justifyContent: 'center', my: 2 }}>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
