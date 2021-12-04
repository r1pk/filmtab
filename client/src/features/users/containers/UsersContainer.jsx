import { useSelector } from 'react-redux';

import Users from '../components/Users';

const UsersContainer = (props) => {
  const users = useSelector((store) => store.users);

  return <Users users={users} {...props} />;
};

export default UsersContainer;
