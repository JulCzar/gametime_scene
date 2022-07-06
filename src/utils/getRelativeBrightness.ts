export const getRelativeBrightness = (r: number, g: number, b: number) => {
  const relativeRed = r ** 2 * 0.299;
  const relativeGreen = g ** 2 * 0.587;
  const relativeBlue = b ** 2 * 0.114;

  return Math.sqrt(relativeRed + relativeGreen + relativeBlue) / 100;
};
