import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import UsernameField from '../Shared/UsernameField';
import Checkbox from '../Shared/Checkbox';
import Button from '../Shared/Button';

const CreateRoomCard = ({ onCreateRoom, ...rest }) => {
  const [username, setUsername] = useState({ value: '', valid: false });
  const [isRoomPrivate, setIsRoomPrivate] = useState(false);
  const isValidForm = username.valid;

  const handleUsernameChange = (e, isValidUsername) => {
    setUsername({ value: e.target.value, valid: isValidUsername });
  };

  const handleVisibilityChange = (e) => {
    setIsRoomPrivate(e.target.checked);
  };

  const handleCreateRoom = () => {
    onCreateRoom(isRoomPrivate, username.value);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Create Room
        </Typography>
        <Stack spacing={2}>
          <UsernameField value={username.value} error={!username.valid} onChange={handleUsernameChange} />
          <Checkbox label="Private room" checked={isRoomPrivate} onChange={handleVisibilityChange} />
        </Stack>
      </CardContent>
      <CardActions>
        <Button disabled={!isValidForm} onClick={handleCreateRoom} fullWidth>
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
