import { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';

import { isValidUsername } from '../utils/isValidUsername';

import ValidationTextField from '../../../components/ValidationTextField';
import Button from '../../../components/Button';

const CreateRoomCard = ({ onCreateRoom, ...rest }) => {
  const [username, setUsername] = useState({ value: '', valid: false });
  const isSubmitButtonDisabled = !username.valid;

  const handleUsernameChange = (e, validatorResult) => {
    setUsername({ value: e.target.value, valid: validatorResult });
  };

  const handleCreateRoom = () => {
    onCreateRoom(username.value);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Create Room
        </Typography>
        <Stack spacing={2}>
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
        <Button fullWidth disabled={isSubmitButtonDisabled} onClick={handleCreateRoom}>
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
