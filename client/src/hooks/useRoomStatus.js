import { useSelector } from 'react-redux';

export const useRoomStatus = () => {
  const roomId = useSelector((store) => store.room.roomId);

  return {
    roomId: roomId,
    isRoomMember: Boolean(roomId),
  };
};
