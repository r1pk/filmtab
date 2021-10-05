import { useDispatch } from 'react-redux';

import { joinRoom } from '../actions/server';

import JoinRoom from '../components/Forms/JoinRoom';

const JoinRoomContainer = () => {
  const dispatch = useDispatch();

  const handleJoinRoom = (isRoomPrivate, username) => {
    return dispatch(joinRoom(isRoomPrivate, username));
  };

  return <JoinRoom onJoinRoom={handleJoinRoom} />;
};

export default JoinRoomContainer;
