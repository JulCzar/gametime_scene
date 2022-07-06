import { createEngineConfig } from './types';

export const defaultConfig = createEngineConfig({
  canvas: document.querySelector<HTMLCanvasElement>('#scene')!,
  runWithConfigFps() {},
  runEveryFrame() {},
  initialState: {},
  runFixed() {},
});
