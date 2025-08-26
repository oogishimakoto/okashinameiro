class TitleScene extends Phaser.Scene {constructor() {super({ key: 'TitleScene' });}

  preload() {
    title_preload.call(this);
  }

  create() {
    title_create.call(this);

  }

  update() {
    title_update.call(this);
  }
}
