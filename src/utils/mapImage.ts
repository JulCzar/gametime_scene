import { getRelativeBrightness } from './getRelativeBrightness';

interface MapImageConfig {
  image: HTMLImageElement;
  cvs: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

interface PixelInfo {
  originalColor: string;
  brightness: number;
  grayScale: string;
}

export type ImageInfo = PixelInfo[][];

export const mapImage = (config: MapImageConfig): ImageInfo => {
  const { image, cvs, ctx } = config;
  const { width, height } = image;
  const mappedImage = [];

  ctx.drawImage(image, 0, 0, width, height);
  const pixels = ctx.getImageData(0, 0, width, height);
  ctx.clearRect(0, 0, width, height);

  for (let y = 0; y < cvs.height; ++y) {
    const row = [];
    for (let x = 0; x < cvs.width; ++x) {
      const r = pixels.data[y * 4 * pixels.width + x * 4];
      const g = pixels.data[y * 4 * pixels.width + x * 4 + 1];
      const b = pixels.data[y * 4 * pixels.width + x * 4 + 2];

      const brightness = getRelativeBrightness(r, g, b);
      const mediumColor = r + g + b / 3;
      const cell = {
        brightness,
        originalColor: `rgb(${r},${g},${b})`,
        grayScale: `rgb(${mediumColor},${mediumColor},${mediumColor})`,
      };
      row.push(cell);
    }
    mappedImage.push(row);
  }

  return mappedImage;
};
