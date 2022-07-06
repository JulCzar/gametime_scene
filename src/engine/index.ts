import { calculateFrameTime } from '../utils/calcFrameTime';
import { defaultConfig } from './initialState';
import { EngineConfig, PhysicsConfig } from './types';

export class Engine<T = Record<string, unknown>> {
  private config: EngineConfig<T>;
  private intervalId: number;
  private _framerate: number;
  private _physics: PhysicsConfig;
  private state: T;

  constructor(config?: Partial<EngineConfig<T>>) {
    const defaultConfigCasted = defaultConfig as EngineConfig<T>;
    this.config = { ...defaultConfigCasted, ...config };
    this.state = { ...this.config.initialState };
    this._framerate = 24;
    this._physics = { cyclesPerSecond: 12 };
    this.intervalId = 0;
  }

  static create<T>(config?: Partial<EngineConfig<T>>) {
    return new Engine<T>(config);
  }

  set framerate(framerate: number) {
    this._framerate = framerate;
  }

  set physicsCyclesPerSecond(cyclesPerSecond: number) {
    this._physics.cyclesPerSecond = cyclesPerSecond;
  }

  start() {
    const self = this;
    const frameTime = calculateFrameTime(self._physics.cyclesPerSecond);

    this.intervalId = setInterval(async () => {
      this.config.runFixed.call(undefined, this.state);
    }, frameTime);

    setTimeout(async function _self() {
      self.config.runEveryFrame.call(undefined, self.state);
      const frameTime = calculateFrameTime(self._framerate);

      setTimeout(_self, frameTime);
    }, calculateFrameTime(self._framerate));
  }

  stop() {
    clearInterval(this.intervalId);
  }
}
