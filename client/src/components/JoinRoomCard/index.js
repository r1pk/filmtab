import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import RoomIdField from '../Shared/RoomIdField';
import UsernameField from '../Shared/UsernameField';
import Button from '../Shared/Button';

const JoinRoomCard = ({ onJoinRoom, defaultRoomId, ...rest }) => {
  const [roomId, setRoomId] = useState({ value: defaultRoomId, valid: !!defaultRoomId });
  const [username, setUsername] = useState({ value: '', valid: false });
  const isValidForm = roomId.valid && username.valid;

  const handleRoomIdChange = (e, isValidRoomId) => {
    setRoomId({ value: e.target.value, valid: isValidRoomId });
  };

  const handleUsernameChange = (e, isValidUsername) => {
    setUsername({ value: e.target.value, valid: isValidUsername });
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
          <RoomIdField value={roomId.value} error={!roomId.valid} onChange={handleRoomIdChange} />
          <UsernameField value={username.value} error={!username.valid} onChange={handleUsernameChange} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button disabled={!isValidForm} onClick={handleJoinRoom} fullWidth>
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
