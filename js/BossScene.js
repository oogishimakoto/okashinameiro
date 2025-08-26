//GameScene2
class Boss extends Phaser.Scene {
  constructor() { super({ key: 'Boss' }); }

  // ゲームの初期化処理を行います
  preload() {
    BossPreload.call(this);
  }
  // 初期化
  create() {
    BossCreate.call(this);
  }
  // 更新処理
  update() {
    BossUpdate.call(this);
  }
};
