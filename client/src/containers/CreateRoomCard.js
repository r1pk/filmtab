import { useDispatch } from 'react-redux';

import { createRoom } from '../actions/room';

import CreateRoomCard from '../components/CreateRoomCard';

const CreateRoomCardContainer = (props) => {
  const dispatch = useDispatch();

  const handleCreateRoom = (isRoomPrivate, username) => {
    dispatch(createRoom(isRoomPrivate, username));
  };

  return <CreateRoomCard onCreateRoom={handleCreateRoom} {...props} />;
};

export default CreateRoomCardContainer;
