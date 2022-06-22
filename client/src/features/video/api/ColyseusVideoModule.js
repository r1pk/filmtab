import * as actions from '../redux/actions';

class ColyseusVideoModule {
  constructor(colyseus, store) {
    this.colyseus = colyseus;
    this.store = store;

    this.progress = 0;

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

  handleProgressIntervalTick = (payload) => {
    this.progress = payload.progress;
  };

  handleRequestVideoProgressMessage = async () => {
    await this.colyseus.roomInstance.send('video::current_progress', { progress: this.progress });
  };

  handleCurrentVideoProgressMessage = (payload) => {
    this.store.dispatch(actions.setVideoProgress(payload.progress, payload.updateTimestamp));
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
      [actions.VIDEO_PROGRESS_INTERVAL_TICK]: this.handleProgressIntervalTick,
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

      room.onMessage('video::current_progress', this.handleCurrentVideoProgressMessage);
      room.onMessage('video::request_progress', this.handleRequestVideoProgressMessage);
      room.onLeave(this.handleLeaveRoomEvent);
    }
  };
}

export default ColyseusVideoModule;
