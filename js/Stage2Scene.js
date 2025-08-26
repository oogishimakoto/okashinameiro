//GameScene2
class Stage2 extends Phaser.Scene {
  constructor() { super({ key: 'Stage2' }); }

  // ゲームの初期化処理を行います
  preload() {
    Stage2Preload.call(this);
  }
  // 初期化
  create() {
    Stage2Create.call(this);
  }
  // 更新処理
  update() {
    Stage2Update.call(this);
  }
};
