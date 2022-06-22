export const reduceProgressDelay = (progress, updateTimestamp) => {
  const offset = (new Date().getTime() - updateTimestamp) / 1000;

  return progress + Math.max(offset, 0);
};
