import { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, FormControlLabel, Checkbox, Stack } from '@mui/material';

import Container from './Container';
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
    <Container header="Create room">
      <Stack direction="row" spacing={2} sx={{ my: 1 }}>
        <FormControlLabel
          control={<Checkbox checked={isRoomPrivate} onChange={handleVisibilityChange} sx={{ py: 1 }} />}
          label="Private"
        />
        <TextField size="small" label="Username" fullWidth onChange={handleUsernameChange} value={username} />
      </Stack>
      <Button onClick={handleCreateRoom}>Create</Button>
    </Container>
  );
};

CreateRoom.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoom;
