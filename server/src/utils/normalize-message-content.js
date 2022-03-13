export const normalizeMessageContent = (content) => {
  return content.trim().replace(/ +(?= )/g, '');
};
