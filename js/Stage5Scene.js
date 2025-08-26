//GameScene2
class Stage5 extends Phaser.Scene {
  constructor() { super({ key: 'Stage5' }); }

  // ゲームの初期化処理を行います
  preload() {
    Stage5Preload.call(this);
  }
  // 初期化
  create() {
    Stage5Create.call(this);
  }
  // 更新処理
  update() {
    Stage5Update.call(this);
  }
};
