import * as actions from '../redux/actions';

class ColyseusVideoModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.colyseus.roomInstanceSubscribers.push(this.roomInstanceListener);
  }

  handleSetVideo = async (payload) => {
    await this.colyseus.roomInstance.send('video::set', { url: payload.url });
  };

  handlePlayVideo = async (payload) => {
    await this.colyseus.roomInstance.send('video::play', { progress: payload.progress });
  };

  handlePauseVideo = async (payload) => {
    await this.colyseus.roomInstance.send('video::pause', { progress: payload.progress });
  };

  handleSeekVideo = async (payload) => {
    await this.colyseus.roomInstance.send('video::seek', { progress: payload.progress });
  };

  handleCurrentVideoProgressMessage = (payload) => {
    this.store.dispatch(actions.updateVideoProgress(payload.currentProgress, payload.updateTimestamp));
  };

  handleLeaveRoomEvent = () => {
    this.store.dispatch(actions.resetVideoState());
  };

  getModuleActions = () => {
    return {
      [actions.SET_VIDEO]: this.handleSetVideo,
      [actions.PLAY_VIDEO]: this.handlePlayVideo,
      [actions.PAUSE_VIDEO]: this.handlePauseVideo,
      [actions.SEEK_VIDEO]: this.handleSeekVideo,
    };
  };

  roomInstanceListener = (room) => {
    if (room !== null) {
      const previousOnChangeCallback = room.state.video.onChange;

      room.state.video.onChange = (changes) => {
        if (previousOnChangeCallback) {
          previousOnChangeCallback(changes);
        }

        const updatedState = changes.reduce((state, change) => ({ ...state, [change.field]: change.value }), {});

        this.store.dispatch(actions.updateVideoState(updatedState));
      };

      room.onMessage('video::current_video_progress', this.handleCurrentVideoProgressMessage);
      room.onLeave(this.handleLeaveRoomEvent);
    }
  };
}

export default ColyseusVideoModule;
