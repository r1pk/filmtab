import { useSelector } from 'react-redux';

import UserList from '../components/UserList';

const UserListContainer = (props) => {
  const users = useSelector((state) => state.room.users);

  return <UserList users={users} {...props} />;
};

export default UserListContainer;
