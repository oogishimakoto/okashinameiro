//GameScene2
class Stage3 extends Phaser.Scene {
  constructor() { super({ key: 'Stage3' }); }

  // ゲームの初期化処理を行います
  preload() {
    Stage3Preload.call(this);
  }
  // 初期化
  create() {
    Stage3Create.call(this);
  }
  // 更新処理
  update() {
    Stage3Update.call(this);
  }
};
