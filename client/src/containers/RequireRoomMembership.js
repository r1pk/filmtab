import { useSelector } from 'react-redux';

import RequireRoomMembership from '../components/RequireRoomMembership';

const RequireRoomMembershipContainer = (props) => {
  const isRoomMember = useSelector((state) => state.room.isRoomMember);

  return <RequireRoomMembership isRoomMember={isRoomMember} fallbackPath="/" {...props} />;
};

export default RequireRoomMembershipContainer;
