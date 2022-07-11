import PropTypes from 'prop-types';

import { ExitToApp } from '@mui/icons-material';

import Button from '../../../components/Button';

const LeaveRoomButton = ({ onLeaveRoom, ...rest }) => {
  const handleLeaveRoom = () => {
    const userConfirmed = window.confirm('Are you sure you want to leave the room?');

    if (userConfirmed) {
      onLeaveRoom();
    }
  };

  return (
    <Button variant="text" color="error" startIcon={<ExitToApp />} onClick={handleLeaveRoom} {...rest}>
      Leave room
    </Button>
  );
};

LeaveRoomButton.propTypes = {
  onLeaveRoom: PropTypes.func.isRequired,
};

export default LeaveRoomButton;
