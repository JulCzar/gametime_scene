import { State } from '../types';

export const drawFrame = (state: State) => {
  const ctx = state.cvs.getContext('2d')!;
  ctx.globalAlpha = 0.1;
  ctx.drawImage(state.image, 0, 0, state.cvs.width, state.cvs.height);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = '#000';
  ctx.globalAlpha = 0.2;
  ctx.fillRect(0, 0, state.cvs.width, state.cvs.height);
  for (let i = 0; i < state.numOfParticles(); i++) {
    const p = state.particles[i];
    ctx.globalAlpha = p.speed * 0.85;
    ctx.beginPath();
    const row = state.mappedImage[p.ix];
    if (row && row[p.iy]) {
      ctx.fillStyle = state.mappedImage[p.iy][p.ix].originalColor;
    }
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    ctx.fill();
  }
};
