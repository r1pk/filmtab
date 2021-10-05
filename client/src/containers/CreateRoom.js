import { useDispatch } from 'react-redux';

import { createRoom } from '../actions/server';

import CreateRoom from '../components/Forms/CreateRoom';

const CreateRoomContainer = () => {
  const dispatch = useDispatch();

  const handleCreateRoom = (isRoomPrivate, username) => {
    return dispatch(createRoom(isRoomPrivate, username));
  };

  return <CreateRoom onCreateRoom={handleCreateRoom} />;
};

export default CreateRoomContainer;
