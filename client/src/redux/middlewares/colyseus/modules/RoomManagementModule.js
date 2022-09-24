import ManagementModule from '../lib/ManagementModule';

import * as actions from '../actions';

class RoomManagementModule extends ManagementModule {
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
      this.handleError(0, error.message);
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
      this.handleError(0, error.message);
    }
  };

  handleLeaveRoomAction = async (action) => {
    try {
      if (this.client.room) {
        await this.client.room.leave();
      }

      return actions.leaveRoom(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleAddUserEvent = (user) => {
    this.store.dispatch(actions.userJoined({ user: user }));
  };

  handleRemoveUserEvent = (user) => {
    this.store.dispatch(actions.userLeft({ user: user }));
  };

  handleLeaveRoomEvent = () => {
    try {
      this.client.room.removeAllListeners();
      this.client.room = null;
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleRoomChange = (room) => {
    if (room) {
      room.state.users.onAdd = this.handleAddUserEvent;
      room.state.users.onRemove = this.handleRemoveUserEvent;

      room.onError(this.handleError);
      room.onLeave(this.handleLeaveRoomEvent);
    }
  };
}

export default RoomManagementModule;
