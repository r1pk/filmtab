import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Divider, TextField, Button, Stack } from '@mui/material';

const JoinRoom = ({ sx, onJoinRoom }) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleJoinRoom = () => {
    if (onJoinRoom) {
      onJoinRoom(roomId, username);
    }
  };

  return (
    <Box sx={sx}>
      <Typography variant="h6">Join room</Typography>
      <Divider sx={{ m: 1 }} />
      <Stack direction="row" spacing={2}>
        <TextField size="small" label="Room Id" onChange={handleRoomIdChange} value={roomId} />
        <TextField size="small" label="Username" onChange={handleUsernameChange} value={username} />
      </Stack>
      <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={handleJoinRoom}>
        Join
      </Button>
    </Box>
  );
};

JoinRoom.propTypes = {
  sx: PropTypes.object,
  onJoinRoom: PropTypes.func.isRequired,
};

export default JoinRoom;
