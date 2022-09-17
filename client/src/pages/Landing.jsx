import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Paper, Typography, Tabs, Tab } from '@mui/material';

import { CreateRoomForm, JoinRoomForm } from '@/features/room';

import { colyseus } from '@/redux';

const Landing = () => {
  const [tab, setTab] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabChange = (_, value) => {
    setTab(value);
  };

  const handleCreateRoom = async (data) => {
    const result = await dispatch(colyseus.room.create({ username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
  };

  const handleJoinRoom = async (data) => {
    const result = await dispatch(colyseus.room.join({ roomId: data.roomId, username: data.username }));

    if (result) {
      const { roomId } = result.payload;

      navigate(`/rooms/${roomId}`);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid container item xs={12} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Paper sx={{ border: 1, borderColor: 'primary.main' }}>
            <Typography variant="h1" component="h1" sx={{ p: 2, textAlign: 'center' }}>
              FilmTab
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container item xs={12} sx={{ justifyContent: 'center' }}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          <Paper sx={{ border: 1, borderColor: 'primary.main' }}>
            <Tabs centered value={tab} onChange={handleTabChange}>
              <Tab value={0} label="Create Room" />
              <Tab value={1} label="Join Room" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>

      <Grid container item xs={12} sx={{ justifyContent: 'center' }}>
        <Grid item xs={10} sm={6} md={4} lg={3}>
          {tab === 0 && <CreateRoomForm onCreateRoom={handleCreateRoom} />}
          {tab === 1 && <JoinRoomForm onJoinRoom={handleJoinRoom} />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
