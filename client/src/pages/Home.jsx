import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';

import { CreateRoomCardContainer, JoinRoomCardContainer } from '../features/room';

import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialRoomId = location.state?.roomId;
  const initialTab = initialRoomId ? 1 : 0;

  const [activeTab, setActiveTab] = useState(initialTab);

  const isRoomMember = useSelector((store) => store.room.isRoomMember);
  const activeRoomId = useSelector((store) => store.room.activeRoomId);

  const handleChangeTab = (e, tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    if (isRoomMember) {
      navigate(`rooms/${activeRoomId}`);
    }
  }, [navigate, isRoomMember, activeRoomId]);

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
          {activeTab === 1 && <JoinRoomCardContainer defaultRoomId={initialRoomId} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
