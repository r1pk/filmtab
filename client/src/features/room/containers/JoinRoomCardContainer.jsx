import { useSelector, useDispatch } from 'react-redux';

import { joinRoom } from '../redux/actions';

import JoinRoomCard from '../components/JoinRoomCard';

const JoinRoomCardContainer = (props) => {
  const isConnecting = useSelector((state) => state.room.isConnecting);

  const dispatch = useDispatch();

  const handleJoinRoom = (roomId, username) => {
    dispatch(joinRoom(roomId, username));
  };

  return <JoinRoomCard isConnecting={isConnecting} onJoinRoom={handleJoinRoom} {...props} />;
};

export default JoinRoomCardContainer;
