import * as actions from '../actions';

export default class VideoManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [actions.setVideo.type]: this.handleSetVideoAction,
      [actions.playVideo.type]: this.handlePlayVideoAction,
      [actions.pauseVideo.type]: this.handlePauseVideoAction,
      [actions.toggleVideoPlayback.type]: this.handleToggleVideoPlaybackAction,
      [actions.seekVideo.type]: this.handleSeekVideoAction,

      [actions.setVideoSubtitles.type]: this.handleSetVideoSubtitlesAction,
      [actions.deleteVideoSubtitles.type]: this.handleDeleteVideoSubtitlesAction,

      [actions.requestSyncVideoProgress.type]: this.handleRequestSyncVideoProgressAction,
      [actions.responseSyncVideoProgress.type]: this.handleResponseSyncVideoProgressAction,
    };
  };

  handleSetVideoAction = async (action) => {
    await this.client.room.send('video::set_url', { url: action.payload.url });

    return actions.setVideo(action.payload);
  };

  handlePlayVideoAction = async (action) => {
    await this.client.room.send('video::play', { progress: action.payload.progress });

    return actions.playVideo(action.payload);
  };

  handlePauseVideoAction = async (action) => {
    await this.client.room.send('video::pause', { progress: action.payload.progress });

    return actions.pauseVideo(action.payload);
  };

  handleToggleVideoPlaybackAction = async (action) => {
    await this.client.room.send('video::toggle_playback', { progress: action.payload.progress });

    return actions.toggleVideoPlayback(action.payload);
  };

  handleSeekVideoAction = async (action) => {
    await this.client.room.send('video::seek', { progress: action.payload.progress });

    return actions.seekVideo(action.payload);
  };

  handleSetVideoSubtitlesAction = async (action) => {
    await this.client.room.send('video::set_subtitles', { subtitles: action.payload.subtitles });

    return actions.setVideoSubtitles(action.payload);
  };

  handleDeleteVideoSubtitlesAction = async (action) => {
    await this.client.room.send('video::delete_subtitles');

    return actions.deleteVideoSubtitles(action.payload);
  };

  handleRequestSyncVideoProgressAction = async (action) => {
    await this.client.room.send('video::sync_progress_request');

    return actions.requestSyncVideoProgress(action.payload);
  };

  handleResponseSyncVideoProgressAction = async (action) => {
    await this.client.room.send('video::sync_progress_response', { progress: action.payload.progress });

    return actions.responseSyncVideoProgress(action.payload);
  };

  handleSyncVideoProgressRequestEvent = () => {
    this.store.dispatch(actions.syncVideoProgressRequested());
  };

  handleSyncVideoProgressResponseEvent = (event) => {
    this.store.dispatch(
      actions.videoStateChanged({
        changes: [{ field: 'progress', value: event.progress }],
      })
    );
  };

  handleVideoStateChangeEvent = (changes) => {
    this.store.dispatch(actions.videoStateChanged({ changes: changes }));
  };

  handleRoomChangeEvent = (room) => {
    room.onMessage('video::sync_progress_request', this.handleSyncVideoProgressRequestEvent);
    room.onMessage('video::sync_progress_response', this.handleSyncVideoProgressResponseEvent);

    room.state.video.onChange = this.handleVideoStateChangeEvent;
  };
}
