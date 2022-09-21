import { toast } from 'react-toastify';

import * as actions from '../actions';

export default class RoomManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [actions.createRoom.type]: this.handleCreateRoomAction,
      [actions.joinRoom.type]: this.handleJoinRoomAction,
      [actions.leaveRoom.type]: this.handleLeaveRoomAction,
    };
  };

  handleCreateRoomAction = async (action) => {
    try {
      const result = await this.client.create('video-room', {
        username: action.payload.username,
      });

      return actions.createRoom({
        roomId: result.id,
        user: {
          id: result.sessionId,
          username: action.payload.username,
        },
      });
    } catch (error) {
      this.handleRoomError(0, error.message);
    }
  };

  handleJoinRoomAction = async (action) => {
    try {
      const result = await this.client.joinById(action.payload.roomId, {
        username: action.payload.username,
      });

      return actions.joinRoom({
        roomId: result.id,
        user: {
          id: result.sessionId,
          username: action.payload.username,
        },
      });
    } catch (error) {
      this.handleRoomError(0, error.message);
    }
  };

  handleLeaveRoomAction = async (action) => {
    try {
      await this.client.room.leave();

      return actions.leaveRoom(action.payload);
    } catch (error) {
      this.handleRoomError(0, error.message);
    }
  };

  handleAddUserEvent = (user) => {
    this.store.dispatch(actions.userJoined({ user: user }));
  };

  handleRemoveUserEvent = (user) => {
    this.store.dispatch(actions.userLeft({ user: user }));
  };

  handleRoomError = (code, message) => {
    toast.error(message);
    console.error(code, message);
  };

  handleLeaveRoomEvent = () => {
    this.client.room.removeAllListeners();
  };

  handleRoomChangeEvent = (room) => {
    room.state.users.onAdd = this.handleAddUserEvent;
    room.state.users.onRemove = this.handleRemoveUserEvent;

    room.onError(this.handleRoomError);
    room.onLeave(this.handleLeaveRoomEvent);
  };
}
