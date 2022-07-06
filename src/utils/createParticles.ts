import { Particle } from '../models/Particle';

const { random } = Math;

/**
 *  @param {number} count the number of particles to create
 *  @param {number} gridWidth the width of the canvas
 */
export const createParticles = (count: number, gridWidth: number) => {
  const particles = [];

  for (let i = 0; i < count; i++) {
    const x = random() * gridWidth;
    const p = new Particle({ x, y: 0 });
    particles.push(p);
  }

  return particles;
};
