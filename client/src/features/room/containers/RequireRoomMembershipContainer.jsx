import { useSelector } from 'react-redux';

import RequireRoomMembership from '../components/RequireRoomMembership';

const RequireRoomMembershipContainer = (props) => {
  const isRoomMember = useSelector((store) => store.room.isRoomMember);

  return <RequireRoomMembership isRoomMember={isRoomMember} fallbackPath="/" {...props} />;
};

export default RequireRoomMembershipContainer;
