import { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Stack } from '@mui/material';

import Container from './Container';
import Button from '../Shared/Button';

const JoinRoom = ({ onJoinRoom, defaultRoomId }) => {
  const [roomId, setRoomId] = useState(defaultRoomId);
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
    <Container header="Join Room">
      <Stack spacing={2} sx={{ my: 1 }}>
        <TextField size="small" label="Room Id" onChange={handleRoomIdChange} value={roomId} />
        <TextField size="small" label="Username" onChange={handleUsernameChange} value={username} />
        <Button onClick={handleJoinRoom}>Join</Button>
      </Stack>
    </Container>
  );
};

JoinRoom.propTypes = {
  defaultRoomId: PropTypes.string,
  onJoinRoom: PropTypes.func.isRequired,
};

JoinRoom.defaultProps = {
  defaultRoomId: '',
};

export default JoinRoom;
