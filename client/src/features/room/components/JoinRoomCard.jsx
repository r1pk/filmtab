import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { generateDefaultUsername } from '../utils/generateDefaultUsername';
import { validateRoomId } from '../utils/validateRoomId';
import { validateUsername } from '../utils/validateUsername';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const JoinRoomCard = ({ onJoinRoom, defaultRoomId, ...rest }) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      roomId: defaultRoomId || '',
      username: generateDefaultUsername(),
    },
  });

  const onSubmit = (data) => {
    onJoinRoom(data.roomId, data.username);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Join Room
        </Typography>
        <Stack spacing={2}>
          <Controller
            name="roomId"
            control={control}
            rules={{ required: true, validate: validateRoomId }}
            render={({ field }) => <TextField {...field} error={!!formState.errors.roomId} label="Room id" />}
          />
          <Controller
            name="username"
            control={control}
            rules={{ required: true, validate: validateUsername }}
            render={({ field }) => <TextField {...field} error={!!formState.errors.username} label="Username" />}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button fullWidth disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>
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

export default JoinRoomCard;
