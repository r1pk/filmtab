import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import { Button } from '@mui/material';
import { ExitToAppOutlined } from '@mui/icons-material';

const LeaveRoomButton = forwardRef(({ onLeaveRoom, ...rest }, ref) => {
  const handleButtonClick = () => {
    const isActionConfirmed = window.confirm('Are you sure you want to leave the room?');

    if (isActionConfirmed) {
      onLeaveRoom();
    }
  };

  return (
    <Button size="small" startIcon={<ExitToAppOutlined />} onClick={handleButtonClick} ref={ref} {...rest}>
      Leave room
    </Button>
  );
});

LeaveRoomButton.displayName = 'LeaveRoomButton';

LeaveRoomButton.propTypes = {
  onLeaveRoom: PropTypes.func.isRequired,
};

export default LeaveRoomButton;
