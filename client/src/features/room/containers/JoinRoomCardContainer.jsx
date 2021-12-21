import { useDispatch } from 'react-redux';

import { joinRoom } from '../redux/actions';

import JoinRoomCard from '../components/JoinRoomCard';

const JoinRoomCardContainer = (props) => {
  const dispatch = useDispatch();

  const handleJoinRoom = (roomId, username) => {
    dispatch(joinRoom(roomId, username));
  };

  return <JoinRoomCard onJoinRoom={handleJoinRoom} {...props} />;
};

export default JoinRoomCardContainer;
