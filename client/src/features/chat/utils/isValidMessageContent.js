export const isValidMessageContent = (content) => {
  return content.length >= 1 && content.length <= 140;
};
