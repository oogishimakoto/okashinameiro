//GameScene2
class Stage4 extends Phaser.Scene {
  constructor() { super({ key: 'Stage4' }); }

  // ゲームの初期化処理を行います
  preload() {
    Stage4Preload.call(this);
  }
  // 初期化
  create() {
    Stage4Create.call(this);
  }
  // 更新処理
  update() {
    Stage4Update.call(this);
  }
};
