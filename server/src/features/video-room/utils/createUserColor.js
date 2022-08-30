export const createUserColor = (name, saturationMultiplier = 0.7, lightnessMultiplier = 0.75) => {
  const sum = name.split('').reduce((p, c) => (p += c.charCodeAt(0)), 0);

  const hue = (sum * 137.5) % 360;
  const saturation = 100 * Math.min(Math.max(saturationMultiplier, 0), 1);
  const lightness = 100 * Math.min(Math.max(lightnessMultiplier, 0), 1);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
