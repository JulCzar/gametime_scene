import { defaultConfig } from './initialState';

export interface PhysicsConfig {
  cyclesPerSecond: number;
}

export interface EngineConfig<T> {
  canvas: HTMLCanvasElement;
  initialState: T;
  runWithConfigFps(config: T): void;
  runEveryFrame(config: T): void;
  runFixed(config: T): void;
}

export const createEngineConfig = <T>(
  config: EngineConfig<T>
): EngineConfig<T> => config;
