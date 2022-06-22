import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { generateDefaultUsername } from '../utils/generateDefaultUsername';
import { validateUsername } from '../utils/validateUsername';

import TextField from '../../../components/TextField';
import LoadingButton from '../../../components/LoadingButton';

const CreateRoomCard = ({ isConnecting, onCreateRoom, ...rest }) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: generateDefaultUsername(),
    },
  });

  const onSubmit = (data) => {
    onCreateRoom(data.username);
  };

  return (
    <Card sx={{ minWidth: 275 }} {...rest}>
      <CardContent>
        <Typography variant="h5" component="div" textAlign="center">
          Create Room
        </Typography>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            rules={{ required: true, validate: validateUsername }}
            render={({ field }) => <TextField {...field} error={!!formState.errors.username} label="Username" />}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <LoadingButton fullWidth disabled={!formState.isValid} loading={isConnecting} onClick={handleSubmit(onSubmit)}>
          {isConnecting ? 'Creating...' : 'Create'}
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

CreateRoomCard.propTypes = {
  isConnecting: PropTypes.bool,
  onCreateRoom: PropTypes.func.isRequired,
};

export default CreateRoomCard;
