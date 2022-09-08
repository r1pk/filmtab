import { room } from '../actions';

export default class RoomManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [room.create.type]: this.handleCreateRoomAction,
      [room.join.type]: this.handleJoinRoomAction,
      [room.leave.type]: this.handleLeaveRoomAction,
    };
  };

  handleCreateRoomAction = async (action) => {
    const result = await this.client.create('video-room', {
      username: action.payload.username,
    });

    return room.create({
      roomId: result.id,
      user: {
        id: result.sessionId,
        username: action.payload.username,
      },
    });
  };

  handleJoinRoomAction = async (action) => {
    const result = await this.client.joinById(action.payload.roomId, {
      username: action.payload.username,
    });

    return room.join({
      roomId: result.id,
      user: {
        id: result.sessionId,
        username: action.payload.username,
      },
    });
  };

  handleLeaveRoomAction = async (action) => {
    await this.client.room.leave();

    return room.leave(action.payload);
  };

  handleOnLeaveEvent = () => {
    this.client.room.removeAllListeners();
  };

  handleOnAddUserEvent = (user) => {
    this.store.dispatch(room.onAddUser({ user: user }));
  };

  handleOnRemoveUserEvent = (user) => {
    this.store.dispatch(room.onRemoveUser({ user: user }));
  };

  handleRoomChangeEvent = (room) => {
    room.state.users.onAdd = this.handleOnAddUserEvent;
    room.state.users.onRemove = this.handleOnRemoveUserEvent;

    room.onLeave(this.handleOnLeaveEvent);
  };
}
