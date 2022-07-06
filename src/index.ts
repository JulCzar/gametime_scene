import { Engine } from './engine';
import { wallpaper } from './assets/wallpaper';
import { mapImage } from './utils/mapImage';
import { createParticles } from './utils/createParticles';
import { updateParticlesPositions } from './services/updateParticlesPositions';
import { drawFrame } from './services/drawFrame';
import { State } from './types';
import { WallpaperEngineInterface } from './services/wallpaperEngineApi';

const d = window.document;
const cvs = d.querySelector<HTMLCanvasElement>('#scene')!;
const ctx = cvs.getContext('2d')!;
const image = new Image();
image.src = wallpaper;

image.addEventListener('load', () => {
  cvs.width = image.width;
  cvs.height = image.height;
  const config = WallpaperEngineInterface.getInstance();

  const engine = Engine.create<State>({
    initialState: {
      particles: createParticles(10_000, image.width),
      mappedImage: mapImage({ image, cvs, ctx }),
      image,
      cvs,
      numOfParticles() {
        return config.particles;
      },
    },
    runFixed: updateParticlesPositions,
    runEveryFrame: drawFrame,
  });

  const unsubscribe = config.subscribe(props => {
    engine.framerate = props.framerate;
    engine.physicsCyclesPerSecond = props.physicsCyclesPerSecond;
  });
  engine.start();

  d.addEventListener('onBeforeUnmount', () => {
    unsubscribe();
    engine.stop();
  });
});
