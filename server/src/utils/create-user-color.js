export const createValue = (sum) => {
  const stringSin = Math.sin(sum).toString().substr(6);

  return ~~(parseFloat(`0.${stringSin}`) * 150);
};

export const createUserColor = (name, brightnessMultiplier = 1) => {
  const sum = name.split('').reduce((p, c) => (p += c.charCodeAt(0)), 0);

  const r = Math.min(createValue(sum + 1) * brightnessMultiplier, 255);
  const g = Math.min(createValue(sum + 2) * brightnessMultiplier, 255);
  const b = Math.min(createValue(sum + 3) * brightnessMultiplier, 255);

  return `rgb(${r}, ${g}, ${b})`;
};
