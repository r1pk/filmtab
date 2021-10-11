import { useState } from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel, Checkbox, Stack } from '@mui/material';

import Container from './Container';
import TextField from '../Shared/TextField';
import Button from '../Shared/Button';

const CreateRoom = ({ onCreateRoom }) => {
  const [username, setUsername] = useState('');
  const [isRoomPrivate, setRoomVisibility] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setRoomVisibility(e.target.checked);
  };

  const handleCreateRoom = () => {
    if (onCreateRoom) {
      onCreateRoom(isRoomPrivate, username);
    }
  };

  return (
    <Container header="Create Room">
      <Stack spacing={2} sx={{ my: 1 }}>
        <TextField label="Username" fullWidth onChange={handleUsernameChange} value={username} />
        <FormControlLabel
          control={<Checkbox checked={isRoomPrivate} onChange={handleVisibilityChange} />}
          label="Private room"
        />
        <Button onClick={handleCreateRoom}>Create</Button>
      </Stack>
    </Container>
  );
};

CreateRoom.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoom;
