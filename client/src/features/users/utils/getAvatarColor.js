export const createValue = (sum) => {
  const stringSin = Math.sin(sum).toString().substr(6);

  return ~~(parseFloat('0.' + stringSin) * 150);
};

export const getAvatarColor = (name) => {
  const sum = name.split('').reduce((p, c) => (p += c.charCodeAt(0)), 0);

  return `rgb(${createValue(sum + 1)}, ${createValue(sum + 2)}, ${createValue(sum + 3)})`;
};
