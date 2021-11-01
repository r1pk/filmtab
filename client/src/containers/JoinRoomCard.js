import { useDispatch } from 'react-redux';

import { joinRoom } from '../actions/room';

import JoinRoomCard from '../components/JoinRoomCard';

const JoinRoomCardContainer = (props) => {
  const dispatch = useDispatch();

  const handleJoinRoom = (isRoomPrivate, username) => {
    dispatch(joinRoom(isRoomPrivate, username));
  };

  return <JoinRoomCard onJoinRoom={handleJoinRoom} {...props} />;
};

export default JoinRoomCardContainer;
