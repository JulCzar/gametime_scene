const { random, floor } = Math;

interface ParticlePosition {
  x: number;
  y: number;
}

export class Particle {
  x: number;
  y: number;
  // velocidade da partícula
  velocity: number;
  // angulo da partícula
  angle: number;
  // velocidade relativa a cor do pixel na coordenada (x, y)
  speed: number;
  // tamanho da partícula
  size: number;

  get ix() {
    return floor(this.x);
  }

  get iy() {
    return floor(this.y);
  }

  constructor(pos: ParticlePosition) {
    this.x = pos.x;
    this.y = pos.y;
    this.velocity = random() * 5;
    this.angle = 0;
    this.speed = 0;
    this.size = random() * 2 + 1;
  }
}
