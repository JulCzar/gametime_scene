class Particle {
  constructor() {
    const config = Config.getInstance();
    this.x = random() * config.canvas.width;
    this.y = 0;
    this.speed = 0;
    this.velocity = random() * 10;
    this.size = random() * 1.5 + 1;
    this.pos1 = floor(this.y);
    this.pos2 = floor(this.x);
    this.angle = 0;
  }
  /**
   *
   * @param {Particle} particle
   * @param {CellInfo[][]} mappedImage
   */
  static update(particle, mappedImage) {
    const config = Config.getInstance();

    particle.pos1 = floor(particle.y);
    particle.pos2 = floor(particle.x);
    const row = mappedImage[particle.pos1];
    if (row && row[particle.pos2]) {
      particle.speed = row[particle.pos2].brightness * (60 / config.framerate);
    }
    const movement = 2.5 - particle.speed + particle.velocity;

    particle.angle += particle.speed / 20;
    particle.y += movement + sin(particle.angle) * 2;
    particle.x += movement / 2 + cos(particle.angle);

    if (particle.y >= config.canvas.height) {
      particle.y = particle.y - config.canvas.height;
      particle.x = random() * config.canvas.width;
    }
    if (particle.x >= config.canvas.width) {
      particle.x = particle.x - config.canvas.width;
      particle.y = random() * config.canvas.height;
    }
  }
  /**
   *
   * @param {Particle} particle
   * @param {CellInfo[][]} mappedImage
   */
  static draw(particle, mappedImage) {
    const config = Config.getInstance();
    const ctx = config.canvas.getContext('2d');

    ctx.beginPath();
    const row = mappedImage[particle.pos1];
    if (row && row[particle.pos2]) {
      const { pos1, pos2 } = particle;
      ctx.fillStyle = mappedImage[pos1][pos2].originalColor;
    }
    ctx.arc(particle.x, particle.y, particle.size, 0, PI * 2);
    ctx.fill();
  }
}
