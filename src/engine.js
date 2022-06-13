class Engine {
  static instance = null;
  /** @type {Particle[]} */
  particles = [];
  /** @type {CellInfo[][]} */
  mappedImage = [];
  currentTimeout = 0;

  constructor() {
    this.update();
  }

  /** @return {Engine} */
  static getInstance() {
    if (!this[instance]) this[instance] = new Engine();
    return this[instance];
  }

  update() {
    this[mapImage]();
    this[createParticles]();
  }

  [createParticles]() {
    const config = Config.getInstance();
    while (this.particles.length) this.particles.pop();

    while (this.particles.length < 10_000)
      this.particles.push(new Particle(config));
  }

  [mapImage]() {
    const config = Config.getInstance();

    const canvas = config.canvas;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(config.img, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (this.mappedImage.length) this.mappedImage.pop();

    for (let y = 0; y < canvas.height; ++y) {
      const row = [];
      for (let x = 0; x < canvas.width; ++x) {
        const [r, g, b] = [
          pixels.data[y * 4 * pixels.width + x * 4],
          pixels.data[y * 4 * pixels.width + x * 4 + 1],
          pixels.data[y * 4 * pixels.width + x * 4 + 2],
        ];
        const brightness = getRelativeBrightness(r, g, b);
        const mediumColor = r + g + b / 3;
        const cell = {
          brightness,
          originalColor: `rgb(${r},${g},${b})`,
          grayScale: `rgb(${mediumColor},${mediumColor},${mediumColor})`,
        };
        row.push(cell);
      }
      this.mappedImage.push(row);
    }
  }

  stop() {
    clearTimeout(this.currentTimeout);
  }

  start() {
    const self = this;
    (function _self() {
      const config = Config.getInstance();
      self.animate();
      self.currentTimeout = setTimeout(_self, config.frameTime);
    })();
  }

  animate() {
    const config = Config.getInstance();
    const cvs = config.canvas;
    const ctx = config.ctx;
    const img = config.img;

    ctx.globalAlpha = 0.1;
    ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 0.2;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    for (let i = 0; i < config.particles; ++i) {
      const particle = this.particles[i];
      Particle.update(particle, this.mappedImage);
      ctx.globalAlpha = particle.speed * 0.85;
      Particle.draw(particle, this.mappedImage);
    }
  }
}
