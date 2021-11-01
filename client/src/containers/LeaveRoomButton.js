import { useSelector, useDispatch } from 'react-redux';

import { leaveRoom } from '../actions/room';

import LeaveRoomButton from '../components/LeaveRoomButton';

const LeaveRoomButtonContainer = (props) => {
  const isRoomMember = useSelector((state) => state.room.isRoomMember);

  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    dispatch(leaveRoom());
  };

  return <LeaveRoomButton isRoomMember={isRoomMember} onLeaveRoom={handleLeaveRoom} {...props} />;
};

export default LeaveRoomButtonContainer;
