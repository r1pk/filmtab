import { useDispatch } from 'react-redux';

import { createRoom } from '../redux/actions';

import CreateRoomCard from '../components/CreateRoomCard';

const CreateRoomCardContainer = (props) => {
  const dispatch = useDispatch();

  const handleCreateRoom = (username) => {
    dispatch(createRoom(username));
  };

  return <CreateRoomCard onCreateRoom={handleCreateRoom} {...props} />;
};

export default CreateRoomCardContainer;
