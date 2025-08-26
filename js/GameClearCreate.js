// Assuming you have defined the necessary variables and set up the scene properly
function GameClearCreate() {
  // 全ての音を止める
  reset_check=false;

  // Scoreボード表示
  this.add.image(width / 2, height / 2, 'GameClear');
  ScoreBoard = this.add.text(width / 3.3, height / 4.0, 'GameClear').setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  SpaceTitle = this.add.text(width / 4, height / 1.2, 'Press Space Title').setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  candy_score = this.add.text(width / 3.3, height / 2.5, 'candy' + ":"+ score_candy).setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  score_stick = this.add.text(width / 3.3, height / 2.0, 'stick' +":"+ score_stick).setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  score_Lcandy = this.add.text(width / 3.3, height / 1.7, 'SpinCandy' +":"+ score_Lcandy).setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });
  score_sweet = this.add.text(width / 3.3, height / 1.48, 'Sweet' +":"+ score_sweet).setFontSize(60).setFontFamily("fantasy").setOrigin(0, 0.5).setStyle({ color: '#000' });

  this.input.keyboard.on('keydown-SPACE', function (event) {
    // 初期化
    playerHP = 500;
    player_Max_HP = 500;
    player_AP=1;
    score_candy = 0;               // 飴の得点
    score_stick = 0;               // スティック飴の得点
    score_Lcandy = 0;              // ペロペロキャンディー
    score_sweet = 0;               // お菓子の詰め合わせ
    
    SwitchButton = this.sound.add('SwitchButton', { SEvolume });
    SwitchButton.once('complete', () => {
      // 鳴り終わった後にTitleSceneを開始
      this.scene.start('TitleScene');
    });
    SwitchButton.play();

  }, this);
}
