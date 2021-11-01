import PropTypes from 'prop-types';

import Button from '../Shared/Button';

const LeaveRoomButton = ({ onLeaveRoom, isRoomMember, ...rest }) => {
  const handleLeaveRoom = () => {
    onLeaveRoom();
  };
  return (
    <Button variant="text" color="error" disabled={!isRoomMember} onClick={handleLeaveRoom} {...rest}>
      Leave room
    </Button>
  );
};

LeaveRoomButton.propTypes = {
  isRoomMember: PropTypes.bool,
  onLeaveRoom: PropTypes.func.isRequired,
};

LeaveRoomButton.defaultProps = {
  isRoomMember: false,
};

export default LeaveRoomButton;
