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
      username: action.payload.username,
      roomId: result.id,
      clientId: result.sessionId,
    });
  };

  handleJoinRoomAction = async (action) => {
    const result = await this.client.joinById(action.payload.roomId, {
      username: action.payload.username,
    });

    return room.join({
      username: action.payload.username,
      roomId: result.id,
      clientId: result.sessionId,
    });
  };

  handleLeaveRoomAction = async () => {
    await this.client.room.leave();

    return room.leave();
  };

  handleOnLeaveEvent = () => {
    this.client.room.removeAllListeners();
  };

  handleOnAddUserEvent = (user) => {
    this.store.dispatch(room.onAddUser(user));
  };

  handleOnRemoveUserEvent = (user) => {
    this.store.dispatch(room.onRemoveUser(user));
  };

  handleRoomChangeEvent = (room) => {
    room.state.users.onAdd = this.handleOnAddUserEvent;
    room.state.users.onRemove = this.handleOnRemoveUserEvent;

    room.onLeave(this.handleOnLeaveEvent);
  };
}
