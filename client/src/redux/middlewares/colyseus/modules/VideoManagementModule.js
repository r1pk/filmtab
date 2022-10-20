import ManagementModule from '../lib/ManagementModule';

import * as actions from '../actions';

class VideoManagementModule extends ManagementModule {
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
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::set_url', { url: action.payload.url });
      }

      return actions.setVideo(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handlePlayVideoAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::play', { progress: action.payload.progress });
      }

      return actions.playVideo(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handlePauseVideoAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::pause', { progress: action.payload.progress });
      }

      return actions.pauseVideo(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleToggleVideoPlaybackAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::toggle_playback', { progress: action.payload.progress });
      }

      return actions.toggleVideoPlayback(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleSeekVideoAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::seek', { progress: action.payload.progress });
      }

      return actions.seekVideo(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleSetVideoSubtitlesAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::set_subtitles', { subtitles: action.payload.subtitles });
      }

      return actions.setVideoSubtitles(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleDeleteVideoSubtitlesAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::delete_subtitles');
      }

      return actions.deleteVideoSubtitles(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleRequestSyncVideoProgressAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::sync_progress_request');
      }

      return actions.requestSyncVideoProgress(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleResponseSyncVideoProgressAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::sync_progress_response', { progress: action.payload.progress });
      }

      return actions.responseSyncVideoProgress(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
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

  handleRoomChange = (room) => {
    if (room) {
      room.onMessage('video::sync_progress_request', this.handleSyncVideoProgressRequestEvent);
      room.onMessage('video::sync_progress_response', this.handleSyncVideoProgressResponseEvent);

      room.state.video.onChange = this.handleVideoStateChangeEvent;
    }
  };
}

export default VideoManagementModule;
