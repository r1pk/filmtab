import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import { isValidRoomId } from '../utils/isValidRoomId';
import { isValidUsername } from '../utils/isValidUsername';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const JoinRoomCard = ({ onJoinRoom, defaultRoomId, ...rest }) => {
  const [roomId, setRoomId] = useState({ value: defaultRoomId, valid: !!defaultRoomId });
  const [username, setUsername] = useState({ value: '', valid: false });
  const isSubmitButtonDisabled = !(roomId.valid && username.valid);

  const handleRoomIdChange = (e, validatorResult) => {
    setRoomId({ value: e.target.value, valid: validatorResult });
  };

  const handleUsernameChange = (e, validatorResult) => {
    setUsername({ value: e.target.value, valid: validatorResult });
  };

  const handleJoinRoom = () => {
    onJoinRoom(roomId.value, username.value);
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
            value={roomId.value}
            error={!roomId.valid}
            validator={isValidRoomId}
            onChange={handleRoomIdChange}
          />
          <ValidationTextField
            label="Username"
            value={username.value}
            error={!username.valid}
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
