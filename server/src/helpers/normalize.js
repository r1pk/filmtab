export const normalize = (string) => {
  if (typeof string === 'string') {
    return string.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
  }
  return '';
};
