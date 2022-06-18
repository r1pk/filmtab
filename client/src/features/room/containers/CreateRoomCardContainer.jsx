import { useSelector, useDispatch } from 'react-redux';

import { createRoom } from '../redux/actions';

import CreateRoomCard from '../components/CreateRoomCard';

const CreateRoomCardContainer = (props) => {
  const isConnecting = useSelector((state) => state.room.isConnecting);

  const dispatch = useDispatch();

  const handleCreateRoom = (username) => {
    dispatch(createRoom(username));
  };

  return <CreateRoomCard isConnecting={isConnecting} onCreateRoom={handleCreateRoom} {...props} />;
};

export default CreateRoomCardContainer;
