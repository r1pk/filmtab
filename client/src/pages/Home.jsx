import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Grid, Paper, Typography, Tabs, Tab } from '@mui/material';

import { CreateRoomForm, JoinRoomForm } from '@/features/room';

import { colyseus } from '@/redux';

const Home = () => {
  const [tab, setTab] = useState(0);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const roomId = useSelector((store) => store.room.roomId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRoomMember = Boolean(roomId);

  const handleTabChange = (_, value) => {
    setTab(value);
  };

  const handleCreateRoom = async (data) => {
    setIsFormDisabled(true);
    const result = await dispatch(colyseus.room.create({ username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
    setIsFormDisabled(false);
  };

  const handleJoinRoom = async (data) => {
    setIsFormDisabled(true);
    const result = await dispatch(colyseus.room.join({ roomId: data.roomId, username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
    setIsFormDisabled(false);
  };

  return (
    <Box>
      <Grid container columns={16} sx={{ justifyContent: 'center' }}>
        <Grid item xs={16} sm={12} md={8} lg={6}>
          <Paper>
            <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
              FilmTab
            </Typography>
            <Paper elevation={2}>
              <Tabs centered value={tab} onChange={handleTabChange}>
                <Tab value={0} label="Create Room" />
                <Tab value={1} label="Join Room" />
              </Tabs>
            </Paper>
          </Paper>
        </Grid>
      </Grid>

      <Grid container columns={16} sx={{ justifyContent: 'center', my: 2 }}>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          {tab === 0 && <CreateRoomForm onCreateRoom={handleCreateRoom} disableForm={isFormDisabled || isRoomMember} />}
          {tab === 1 && <JoinRoomForm onJoinRoom={handleJoinRoom} disableForm={isFormDisabled || isRoomMember} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
