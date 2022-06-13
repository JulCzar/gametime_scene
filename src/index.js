const config = Config.getInstance();

config.onLoadImage(() => {
  const engine = Engine.getInstance();

  config.subscribe(engine.update);

  engine.start();
});
