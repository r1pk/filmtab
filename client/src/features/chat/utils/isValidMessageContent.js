export const isValidMessageContent = (content) => {
  const normalizedContent = content.trim().replace(/ +(?= )/g, '');

  return normalizedContent.length >= 1 && normalizedContent.length <= 140;
};
