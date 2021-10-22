import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import Container from './Container';
import TextField from '../Shared/TextField';
import Button from '../Shared/Button';

const JoinRoom = ({ onJoinRoom, defaultRoomId, ...rest }) => {
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
    <Container header="Join Room" {...rest}>
      <Stack spacing={2} sx={{ my: 1 }}>
        <TextField label="Room Id" onChange={handleRoomIdChange} value={roomId} />
        <TextField label="Username" onChange={handleUsernameChange} value={username} />
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
