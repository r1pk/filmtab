import { useDispatch } from 'react-redux';

import { createRoom } from '../actions/server';

import CreateRoom from '../components/Forms/CreateRoom';

const CreateRoomContainer = (props) => {
  const dispatch = useDispatch();

  const handleCreateRoom = (isRoomPrivate, username) => {
    dispatch(createRoom(isRoomPrivate, username));
  };

  return <CreateRoom onCreateRoom={handleCreateRoom} {...props} />;
};

export default CreateRoomContainer;
