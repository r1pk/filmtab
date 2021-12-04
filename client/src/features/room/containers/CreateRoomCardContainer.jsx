import { useDispatch } from 'react-redux';

import { createRoom } from '../redux/actions';

import CreateRoomCard from '../components/CreateRoomCard';

const CreateRoomCardContainer = (props) => {
  const dispatch = useDispatch();

  const handleCreateRoom = (isRoomPrivate, username) => {
    dispatch(createRoom(isRoomPrivate, username));
  };

  return <CreateRoomCard onCreateRoom={handleCreateRoom} {...props} />;
};

export default CreateRoomCardContainer;
