export const generateColor = (index: number) => {
  const hue = index * 137.508;
  return `hsl(${hue % 360}, 50%, 50%)`;
};
