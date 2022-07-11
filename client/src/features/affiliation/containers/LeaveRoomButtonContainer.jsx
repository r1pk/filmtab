import { useDispatch } from 'react-redux';

import { leaveRoom } from '../redux/actions';

import LeaveRoomButton from '../components/LeaveRoomButton';

const LeaveRoomButtonContainer = (props) => {
  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    dispatch(leaveRoom());
  };

  return <LeaveRoomButton onLeaveRoom={handleLeaveRoom} {...props} />;
};

export default LeaveRoomButtonContainer;
