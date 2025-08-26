//GameScene2
class Stage1 extends Phaser.Scene {
  constructor() { super({ key: 'Stage1' }); }

  // ゲームの初期化処理を行います
  preload() {
    Stage1Preload.call(this);
  }
  // 初期化
  create() {
    Stage1Create.call(this);
  }
  // 更新処理
  update() {
    Stage1Update.call(this);
  }
};
