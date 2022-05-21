import PropTypes from 'prop-types';

import { Card, CardContent, CardActions, Stack, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { validateUsername } from '../utils/validateUsername';

import TextField from '../../../components/TextField';
import Button from '../../../components/Button';

const CreateRoomCard = ({ onCreateRoom, ...rest }) => {
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
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
        <Button fullWidth disabled={!formState.isValid} onClick={handleSubmit(onSubmit)}>
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
