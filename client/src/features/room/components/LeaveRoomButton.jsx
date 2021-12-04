import PropTypes from 'prop-types';

import Button from '../../../components/Button';

const LeaveRoomButton = ({ onLeaveRoom, ...rest }) => {
  const handleLeaveRoom = () => {
    onLeaveRoom();
  };

  return (
    <Button variant="text" color="error" onClick={handleLeaveRoom} {...rest}>
      Leave room
    </Button>
  );
};

LeaveRoomButton.propTypes = {
  onLeaveRoom: PropTypes.func.isRequired,
};

export default LeaveRoomButton;
