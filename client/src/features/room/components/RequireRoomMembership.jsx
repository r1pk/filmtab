import PropTypes from 'prop-types';
import { Navigate, Outlet, useParams } from 'react-router-dom';

const RequireRoomMembership = ({ isRoomMember, fallbackPath }) => {
  const { roomId } = useParams();

  if (!isRoomMember) {
    return <Navigate to={fallbackPath} state={{ roomId }} />;
  }

  return <Outlet />;
};

RequireRoomMembership.propTypes = {
  isRoomMember: PropTypes.bool,
  fallbackPath: PropTypes.string,
};

RequireRoomMembership.defaultProps = {
  isRoomMember: false,
  fallbackPath: '/',
};

export default RequireRoomMembership;
