import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import Container from './Container';
import TextField from '../Shared/TextField';
import Checkbox from '../Shared/Checkbox';
import Button from '../Shared/Button';

const CreateRoom = ({ onCreateRoom, ...rest }) => {
  const [username, setUsername] = useState('');
  const [isRoomPrivate, setIsRoomPrivate] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setIsRoomPrivate(e.target.checked);
  };

  const handleCreateRoom = () => {
    if (onCreateRoom) {
      onCreateRoom(isRoomPrivate, username);
    }
  };

  return (
    <Container header="Create Room" {...rest}>
      <Stack spacing={2} sx={{ my: 1 }}>
        <TextField label="Username" onChange={handleUsernameChange} value={username} />
        <Checkbox label="Private room" onChange={handleVisibilityChange} checked={isRoomPrivate} />
        <Button onClick={handleCreateRoom}>Create</Button>
      </Stack>
    </Container>
  );
};

CreateRoom.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoom;
