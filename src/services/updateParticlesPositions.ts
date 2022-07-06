import { State } from '../types';

const { sin, cos, random } = Math;

export const updateParticlesPositions = (state: State) => {
  for (let i = 0; i < state.numOfParticles(); i++) {
    const p = state.particles[i];
    const row = state.mappedImage[p.ix];
    if (row && row[p.ix]) {
      p.speed = row[p.iy].brightness;
    }
    const movement = 2.5 - p.speed + p.velocity;

    p.angle += p.speed / 20;
    p.y += movement + sin(p.angle) * 2;
    p.x += movement / 2 + cos(p.angle);

    if (p.iy >= state.cvs.height) {
      p.y = p.iy - state.cvs.height;
      p.x = random() * state.cvs.width;
    }
    if (p.ix >= state.cvs.width) {
      p.x = p.ix - state.cvs.width;
      p.y = random() * state.cvs.height;
    }
  }
};
