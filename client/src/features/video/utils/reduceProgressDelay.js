export const reduceProgressDelay = (isVideoPlaying, videoProgress, updateTimestamp) => {
  if (isVideoPlaying) {
    const offset = (new Date().getTime() - updateTimestamp) / 1000;

    return videoProgress + Math.max(offset, 0);
  }

  return videoProgress;
};
