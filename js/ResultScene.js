// TitleScene.js
class ResultScene extends Phaser.Scene {
  constructor() { super({ key: 'ResultScene' }); }

  create() {
    result_create.call(this);
  }
  updeta() {
    result_update.call(this);
  }
};



