import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import { validateRoomId } from '../utils/validateRoomId';
import { validateUsername } from '../utils/validateUsername';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const JoinRoomCard = ({ onJoinRoom, defaultRoomId, ...rest }) => {
  const [roomId, setRoomId] = useState(defaultRoomId);
  const [isValidRoomId, setIsValidRoomId] = useState(!!defaultRoomId);
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const showRoomIdInputError = roomId !== '' && !isValidRoomId;
  const showUsernameInputError = username !== '' && !isValidUsername;
  const isSubmitButtonDisabled = !(isValidRoomId && isValidUsername);

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
    setIsValidRoomId(validateRoomId(e.target.value));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsValidUsername(validateUsername(e.target.value));
  };

  const handleJoinRoom = () => {
    onJoinRoom(roomId, username);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Join Room
        </Typography>
        <Stack spacing={2}>
          <TextField label="Room id" value={roomId} error={showRoomIdInputError} onChange={handleRoomIdChange} />
          <TextField label="Username" value={username} error={showUsernameInputError} onChange={handleUsernameChange} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth disabled={isSubmitButtonDisabled} onClick={handleJoinRoom}>
          Join
        </Button>
      </CardActions>
    </Card>
  );
};

JoinRoomCard.propTypes = {
  defaultRoomId: PropTypes.string,
  onJoinRoom: PropTypes.func.isRequired,
};

JoinRoomCard.defaultProps = {
  defaultRoomId: '',
};

export default JoinRoomCard;
