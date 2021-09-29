import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Divider, TextField, FormControlLabel, Checkbox, Button, Stack } from '@mui/material';

const CreateRoom = ({ sx, onCreateRoom }) => {
  const [username, setUsername] = useState('');
  const [roomVisibility, setRoomVisibility] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setRoomVisibility(e.target.checked);
  };

  const handleCreateRoom = () => {
    if (onCreateRoom) {
      onCreateRoom(roomVisibility, username);
    }
  };

  return (
    <Box sx={sx}>
      <Typography variant="h6">Create room</Typography>
      <Divider sx={{ m: 1 }} />
      <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={<Checkbox checked={roomVisibility} onChange={handleVisibilityChange} sx={{ padding: '5px 9px' }} />}
          label="Private"
        />
        <TextField size="small" label="Username" fullWidth onChange={handleUsernameChange} value={username} />
      </Stack>
      <Button variant="contained" size="small" sx={{ mt: 1 }} onClick={handleCreateRoom}>
        Create
      </Button>
    </Box>
  );
};

CreateRoom.propTypes = {
  sx: PropTypes.object,
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoom;
