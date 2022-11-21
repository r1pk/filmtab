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

      [actions.requestVideoProgress.type]: this.handleRequestVideoProgressAction,
      [actions.sendVideoProgress.type]: this.handleSendVideoProgressAction,
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

  handleRequestVideoProgressAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::request_progress');
      }

      return actions.requestVideoProgress(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleSendVideoProgressAction = async (action) => {
    try {
      if (this.client.isRoomMember) {
        await this.client.room.send('video::progress', { progress: action.payload.progress });
      }

      return actions.sendVideoProgress(action.payload);
    } catch (error) {
      this.handleError(0, error.message);
    }
  };

  handleRequestVideoProgressEvent = () => {
    this.store.dispatch(actions.videoProgressRequested());
  };

  handleVideoProgressEvent = (event) => {
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
      room.onMessage('video::request_progress', this.handleRequestVideoProgressEvent);
      room.onMessage('video::progress', this.handleVideoProgressEvent);

      room.state.video.onChange = this.handleVideoStateChangeEvent;
    }
  };
}

export default VideoManagementModule;
