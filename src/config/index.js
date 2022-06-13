class Config {
  static [instance] = null;
  /** @type {Observer[]} */
  observers = [];

  constructor() {
    const ROOT = d.getElementById('root');
    const cvs = d.createElement('canvas');

    ROOT.append(cvs);

    this.canvas = cvs;
    this.ctx = cvs.getContext('2d');
    this._particles = 3000;
    this._framerate = 60;
    this.img = new Image();
    this.img.src = wallpaper;

    this.img.addEventListener('load', function () {
      cvs.width = this.width;
      cvs.height = this.height;
    });

    const self = this;

    // wallpaper engine related
    window.wallpaperPropertyListener = {
      applyUserProperties(prop) {
        if (prop.particles) {
          self.particles = prop.particles.value;
        }
        if (prop.framerate) {
          self.framerate = prop.framerate.value;
        }
        // if (prop.wallpaper) {
        //   self.wallpaper =
        //     decodeURIComponent(prop.wallpaper.value) ?? wallpaper;
        // }
      },
    };

    delete window.instance;
  }

  /** @returns {Config} */
  static getInstance() {
    if (!this[instance]) {
      this[instance] = new Config();
    }
    return this[instance];
  }

  /**
   *
   * @param {Observer} observer
   * @returns {Unsubscriber}
   */
  subscribe(observer) {
    this.observers.push(observer);

    return () => {
      this.observers = this.observers.filter(o => o !== observer);
    };
  }

  notify() {
    this.observers.forEach(o => o());
  }

  get particles() {
    return this._particles;
  }

  get framerate() {
    return this._framerate;
  }

  set particles(value) {
    if (value > 10_000) this._particles = 10000;
    else if (value < 0) this._particles = 0;
    else this._particles = value;
  }

  set framerate(value) {
    if (value > 240) this._framerate = 240;
    else if (value < 12) this._framerate = 12;
    else this._framerate = value;
  }

  set wallpaper(value) {
    this.img.src = value;
    this.notify();
  }

  get frameTime() {
    return 1000 / this._framerate;
  }

  onLoadImage(callback) {
    this.img.addEventListener('load', callback);
  }
}
