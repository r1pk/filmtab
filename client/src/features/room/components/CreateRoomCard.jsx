import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import { validateUsername } from '../utils/validateUsername';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const CreateRoomCard = ({ onCreateRoom, ...rest }) => {
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const showUsernameInputError = username !== '' && !isUsernameValid;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsUsernameValid(validateUsername(e.target.value));
  };

  const handleCreateRoom = () => {
    onCreateRoom(username);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Create Room
        </Typography>
        <Stack spacing={2}>
          <TextField label="Username" value={username} error={showUsernameInputError} onChange={handleUsernameChange} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth disabled={!isUsernameValid} onClick={handleCreateRoom}>
          Create
        </Button>
      </CardActions>
    </Card>
  );
};

CreateRoomCard.propTypes = {
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoomCard;
