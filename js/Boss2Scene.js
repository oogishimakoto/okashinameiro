//GameScene2
class Boss2 extends Phaser.Scene {
  constructor() { super({ key: 'Boss2' }); }

  // ゲームの初期化処理を行います
  preload() {
    Boss2Preload.call(this);
  }
  // 初期化
  create() {
    Boss2Create.call(this);
  }
  // 更新処理
  update() {
    Boss2Update.call(this);
  }
};
