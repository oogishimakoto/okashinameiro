// TitleCreate.js
function title_create() {
  
  // 全ての音を止める
  this.sound.stopAll();
  // BGMを再生

  const TitleBgm = this.sound.add('titlebgm');
  TitleBgm.play({
    volume: BGMvolume,// volumeの種類設定
    loop: true        // ループ設定
  });
  TitleBgm.setVolume(BGMvolume);// 音量を設定
  
  // Title画像
  this.add.image(width / 2, height / 2, 'Title');
  let Option=this.add.image(70, 70, 'Icon');
  Option.setScale(0.2);
   // スプライトに「pointerdown」イベントリスナーを追加
   Option.setInteractive(); // スプライトを対話的にする
   Option.on('pointerdown', function () {
       // ここで別のシーンに遷移します
       this.scene.start('AudioManager'); // '次のシーンのキー'を次に遷移したいシーンのキーに置き換えてください
   }, this);
   
  // 文字を作成し点滅処理をつける
  let sceneName = this.add.text(width / 3.3, height / 1.5, 'SceneGame').setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  this.tweens.add({
    targets: sceneName,
    alpha: 0, // 透明度を0にする（非表示）
    yoyo: true, // 往復させる
    repeat: -1, // 無限に繰り返す
    ease: 'Power1',
    duration: 1000, // 1秒ごとに点滅
  });
  // 文字を作成し点滅処理をつける
  let change = this.add.text(width / 3, height / 1.35, 'press space to play').setFontSize(30).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  this.tweens.add({
    targets: change,
    alpha: 0, // 透明度を0にする（非表示）
    yoyo: true, // 往復させる
    repeat: -1, // 無限に繰り返す
    ease: 'Power1',
    duration: 1000, // 1秒ごとに点滅
  });
  // SEが終了後開始
  this.input.keyboard.on('keydown-SPACE', function (event) {
    SwitchButton = this.sound.add('SwitchButton', { volume: SEvolume });
    SwitchButton.play();
    SwitchButton.once('complete', () => {
      this.scene.start('GameScene');
    });
  }, this);
  this.input.keyboard.on('keydown-ESC', function (event) {
    SwitchButton = this.sound.add('SwitchButton', { volume: SEvolume });
    SwitchButton.play();
    SwitchButton.once('complete', () => {
      this.scene.start('AudioManager');
    });  }, this);
    
  }
  
  
  
