import { ConfigProps } from '../types';

type Observer = (props: ConfigProps) => void;

const { max, min } = Math;

export class WallpaperEngineInterface {
  private static instance: WallpaperEngineInterface;
  private observers: Observer[];

  physicsCyclesPerSecond: number;
  particles: number;
  framerate: number;

  subscribe(observer: Observer) {
    this.observers.push(observer);

    return () => {
      this.observers = this.observers.filter(o => o !== observer);
    };
  }

  notify() {
    const thisDto = {
      physicsCyclesPerSecond: this.physicsCyclesPerSecond,
      particles: this.particles,
      framerate: this.framerate,
    };
    this.observers.forEach(observer => observer.call(undefined, thisDto));
  }
  private constructor() {
    this.physicsCyclesPerSecond = 12;
    this.particles = 3000;
    this.framerate = 24;
    this.observers = [];
    const self = this;

    window.wallpaperPropertyListener = {
      applyUserProperties(prop) {
        if (prop.particles) {
          self.particles = max(0, min(prop.particles.value, 10_000));
          self.notify();
        }
        if (prop.framerate) {
          self.framerate = max(0, min(prop.framerate.value, 120));
          self.notify();
        }
        if (prop.physics) {
          self.physicsCyclesPerSecond = max(10, min(prop.physics.value, 120));
          self.notify();
        }
      },
    };
  }

  static getInstance() {
    if (!WallpaperEngineInterface.instance) {
      WallpaperEngineInterface.instance = new WallpaperEngineInterface();
    }
    return WallpaperEngineInterface.instance;
  }
}
