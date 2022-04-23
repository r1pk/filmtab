import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import { isValidRoomId } from '../utils/isValidRoomId';
import { isValidUsername } from '../utils/isValidUsername';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const JoinRoomCard = ({ onJoinRoom, defaultRoomId, ...rest }) => {
  const [roomId, setRoomId] = useState(defaultRoomId);
  const [isRoomIdValid, setIsRoomIdValid] = useState(!!defaultRoomId);
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const isSubmitButtonDisabled = !(isRoomIdValid && isUsernameValid);

  const handleRoomIdChange = (e, validatorResult) => {
    setRoomId(e.target.value);
    setIsRoomIdValid(validatorResult);
  };

  const handleUsernameChange = (e, validatorResult) => {
    setUsername(e.target.value);
    setIsUsernameValid(validatorResult);
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
          <ValidationTextField
            label="Room id"
            value={roomId}
            error={!isRoomIdValid}
            validator={isValidRoomId}
            onChange={handleRoomIdChange}
          />
          <ValidationTextField
            label="Username"
            value={username}
            error={!isUsernameValid}
            validator={isValidUsername}
            onChange={handleUsernameChange}
          />
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
