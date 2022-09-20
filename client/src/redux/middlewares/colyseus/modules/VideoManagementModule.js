import { video } from '../actions';

export default class VideoManagementModule {
  constructor(client, store) {
    this.client = client;
    this.store = store;

    this.client.onRoomChange = this.handleRoomChangeEvent;
  }

  getModuleActions = () => {
    return {
      [video.set.type]: this.handleSetVideoAction,
      [video.play.type]: this.handlePlayVideoAction,
      [video.pause.type]: this.handlePauseVideoAction,
      [video.togglePlayback.type]: this.handleTogglePlaybackVideoAction,
      [video.seek.type]: this.handleSeekVideoAction,

      [video.subtitles.set.type]: this.handleSetSubtitlesAction,
      [video.subtitles.delete.type]: this.handleDeleteSubtitlesAction,

      [video.progress.syncRequest.type]: this.handleSyncProgressRequestAction,
      [video.progress.syncResponse.type]: this.handleSyncProgressResponseAction,
    };
  };

  handleSetVideoAction = async (action) => {
    await this.client.room.send('video::set_url', { url: action.payload.url });

    return video.set(action.payload);
  };

  handlePlayVideoAction = async (action) => {
    await this.client.room.send('video::play', { progress: action.payload.progress });

    return video.play(action.payload);
  };

  handlePauseVideoAction = async (action) => {
    await this.client.room.send('video::pause', { progress: action.payload.progress });

    return video.pause(action.payload);
  };

  handleTogglePlaybackVideoAction = async (action) => {
    await this.client.room.send('video::toggle_playback', { progress: action.payload.progress });

    return video.togglePlayback(action.payload);
  };

  handleSeekVideoAction = async (action) => {
    await this.client.room.send('video::seek', { progress: action.payload.progress });

    return video.seek(action.payload);
  };

  handleSetSubtitlesAction = async (action) => {
    await this.client.room.send('video::set_subtitles', { subtitles: action.payload.subtitles });

    return video.subtitles.set(action.payload);
  };

  handleDeleteSubtitlesAction = async (action) => {
    await this.client.room.send('video::delete_subtitles');

    return video.subtitles.delete(action.payload);
  };

  handleSyncProgressRequestAction = async (action) => {
    await this.client.room.send('video::sync_progress_request');

    return video.progress.syncRequest(action.payload);
  };

  handleSyncProgressResponseAction = async (action) => {
    await this.client.room.send('video::sync_progress_response', { progress: action.payload.progress });

    return video.progress.syncResponse(action.payload);
  };

  handleSyncProgressRequestEvent = () => {
    this.store.dispatch(video.progress.onSyncRequest());
  };

  handleSyncProgressResponseEvent = (event) => {
    this.store.dispatch(video.progress.onSyncResponse({ progress: event.progress }));
  };

  handleStateChangesEvent = (changes) => {
    this.store.dispatch(video.onStateChanges({ changes: changes }));
  };

  handleRoomChangeEvent = (room) => {
    room.onMessage('video::sync_progress_request', this.handleSyncProgressRequestEvent);
    room.onMessage('video::sync_progress_response', this.handleSyncProgressResponseEvent);

    room.state.video.onChange = this.handleStateChangesEvent;
  };
}
