import { Particle } from './models/Particle';
import { ImageInfo } from './utils/mapImage';

export type State = {
  particles: Particle[];
  mappedImage: ImageInfo;
  cvs: HTMLCanvasElement;
  image: HTMLImageElement;
  numOfParticles(): number;
};

export type ConfigProps = {
  physicsCyclesPerSecond: number;
  particles: number;
  framerate: number;
};

interface WallpaperEngineProp {
  value: number;
}

type Props = Record<string, WallpaperEngineProp>;

declare global {
  interface Window {
    wallpaperPropertyListener: {
      applyUserProperties(prop: Props): void;
    };
  }
}
