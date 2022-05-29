import { useState } from 'react';

import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';

import { CreateRoomCardContainer, JoinRoomCardContainer } from '../features/room';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (e, tabIndex) => {
    setActiveTab(tabIndex);
  };

  useDocumentTitle('FilmTab - Home');

  return (
    <Grid container justifyContent="center" direction="row" spacing={1} mt={2}>
      <Grid item xs={12}>
        <Typography variant="h1" component="div" textAlign="center">
          FilmTab
        </Typography>
      </Grid>
      <Grid item>
        <Tabs centered variant="fullWidth" value={activeTab} onChange={handleChangeTab}>
          <Tab label="Create room" />
          <Tab label="Join room" />
        </Tabs>
        <Box p={1}>
          {activeTab === 0 && <CreateRoomCardContainer />}
          {activeTab === 1 && <JoinRoomCardContainer />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
