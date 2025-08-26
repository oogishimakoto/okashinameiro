var sectorShape; function Stage2Create() {
  // キーボード有効
  cursors = this.input.keyboard.createCursorKeys();
  // 全ての音を止める
  this.sound.stopAll();
  // BGMを再生
  const Stage2BGM = this.sound.add('Stage2');
  Stage2BGM.play({
    volume: BGMvolume,// volumeの種類設定
    loop: true        // ループ設定
  });
  Stage2BGM.setVolume(BGMvolume);// 音量を設定
  // 背景アニメーションの設定
  background = this.physics.add.sprite(width / 2, height / 2, "background");
  background.body.setAllowGravity(false); // 無重力にする。
  this.anims.create({// アニメーション設定
    key: "background",
    frames: this.anims.generateFrameNumbers('background', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] }),
    frameRate: 5,
    repeat: -10
  });
  background.anims.play('background', true);

  // ScoreBoardの設定
  ScoreBoard = this.physics.add.sprite(width / 2, height / 2, "ScoreBoard");
  ScoreBoard.body.setAllowGravity(false);    // 無重力

  // プラットフォーム設定
  platforms = this.physics.add.staticGroup();
  // プラットフォーム作成、座標XY設定、画像設定、リサイズ、物体の更新処理
  platforms.create(400, 630, 'ground').setScale(2).refreshBody();    // 地面の描画
  platforms.create(0, 350, 'ground').setScale(1).refreshBody();    // 地面の描画
  platforms.create(450, 500, 'ground').setScale(0.5,1).refreshBody();    // 地面の描画
  platforms.create(550, 250, 'ground').setScale(0.1,1).refreshBody();    // 地面の描画
  platforms.create(760, 200, 'ground').setScale(0.2,1).refreshBody();    // 地面の描画

  // 当たり判定を取るためのCheck
  hitchek = this.physics.add.image(0, 0, "HitCheck");
  hitchek.setScale(10.0);                // サイズなくてもスケールだけでも可能
  hitchek.setSize(2000, 2000)            // 大き目にしといたら大丈夫
  hitchek.body.setAllowGravity(false);  // 無重力にする。

  // 円を作成
  const circleRadius = 50;
  light = this.add.graphics();
  light.fillStyle(0x000000, 0.5);
  light.beginPath();
  light.moveTo(0, 0);
  light.arc(0, 0, circleRadius, 0, Phaser.Math.PI2, false);
  light.lineTo(0, 0);
  light.fillPath();

  // プレイヤースプライトを作成し、初期位置を設定します
  player = this.physics.add.sprite(0, 300, "player");
  // プレイヤーが世界の境界と衝突するように設定します
  player.setCollideWorldBounds(true);
  // プレイヤーに重力を設定します
  player.body.setGravityY(player_gravity);
  // プレイヤーのスケール変更
  player.setScale(0.2);
  // プレイヤーの当たり判定サイズを設定（小さな矩形を設定します）
  player.setSize(190, 295);
  // 左向きのアニメーションの設定



  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers('player', { frames: [3, 4, 5, 4] }),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 0, 1] }),
    frameRate: 2
  });

  // 右向きのアニメーションの設定
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { frames: [6, 7, 8, 7] }),
    frameRate: 5,
    repeat: -1
  });


  warp = this.physics.add.sprite(770, 130, "Warp");
  warp.setScale(0.8, 1.5);
  warp.setSize(0.5, 0.5);
  warp.body.setAllowGravity(false);  // 無重力にする。
  warp.setAlpha(0.8);  // 透明度を設定
  // 加算合成を設定
  warp.setBlendMode(Phaser.BlendModes.ADD);
  this.anims.create({
    key: 'warp_play',
    frames: this.anims.generateFrameNumbers('Warp', { frames: [5, 6, 8, 7, 6] }),
    frameRate: 10,
    repeat: -1
  });
  // ジョニー
  enemy_johnny = this.physics.add.group({
    key: "Boss2",
    repeat: 0,
  });

  // enemy_specterスプライトに対してスケールとサイズを設定
  enemy_johnny.children.iterate(function (child, index) {
    if (index === 0) {
      child.setX(40000);
      child.setY(300);
    }
    // オプション追加
    child.setScale(0.3);     // スケールを設定
    child.enemy_name = "enemy_specter";
    child.enemyHP = 3000000;//1000;
    child.MaxHP = 3000000;
    child.enemyAP = 20;
    child.enemySpeed = 150;
    child.body.setGravityY(0);
    child.setAlpha(1.0); // 透過度を0.5に設定（0から1の範囲で設定）
    child.enemy_damage_cool_time = 3;
    child.setCollideWorldBounds(true);
    child.setVisible(false); // smoke'スプライトを非表示にします。

  });

  yami = this.physics.add.sprite(10000, 1000, "Yami");
  yami.body.setAllowGravity(false);  // 無重力にする。
  yami.enemyAP=10;
  // アニメーション設定
  this.anims.create({
    key: "Yami",
    frames: this.anims.generateFrameNumbers('Yami', { frames: [1, 3, 5, 7, 9, 0, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15] }),
    frameRate: 10,
    repeat: -1
  });
  yami.setVisible(false); // smoke'スプライトを非表示にします。

  //-----------敵の処理-----------
  // GhostSpriteグループを作成
  enemy_ghost = this.physics.add.group({
    key: "GhostSprite",
    repeat: 3,
  });
  // アニメーションを作成
  this.anims.create({
    key: 'GhostSprite_anim_left', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('GhostSprite', { frames: [0, 1, 2, 2, 1, 0] }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: 'GhostSprite_anim_right', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('GhostSprite', { frames: [3, 4, 5, 5, 4, 3] }),
    frameRate: 5,
    repeat: -1,
  });
  // 各catEnemyスプライトに対してスケールとサイズを設定
  enemy_ghost.children.iterate(function (child, index) {
    if (index !== 100) {
      // 位置を設定するための子オブジェクトの例
      child.setX(getRandomPositionAwayFromPlayer().x);
      child.setY(getRandomPositionAwayFromPlayer().y);
    }
    // オプション追加
    child.setScale(0.5);     // スケールを設定
    child.setSize(100, 140);     // サイズを設定
    child.enemy_name = "enemy_ghost";
    child.enemyHP = 100000;
    child.enemyAP = 1;
    child.enemySpeed = 50;
    child.body.setGravityY(0);
    child.body.setAllowGravity(false);  // 無重力にする。
    child.enemy_damage_cool_time=3;

  });

  // WitchSpriteグループを作成
  enemy_witch = this.physics.add.group({
    key: "WitchSprite",
    repeat: 4,
  });
  // アニメーションを作成
  this.anims.create({
    key: 'witchSprite_anim_left', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('WitchSprite', { frames: [0, 1, 2, 2, 1, 0] }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: 'witchSprite_anim_right', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('WitchSprite', { frames: [3, 4, 5, 5, 4, 3] }),
    frameRate: 5,
    repeat: -1,
  });
  // enemy_witch
  enemy_witch.children.iterate(function (child, index) {
    if (index !== 100) {
      // 位置を設定するための子オブジェクトの例
      child.setX(getRandomPositionAwayFromPlayer().x);
      child.setY(getRandomPositionAwayFromPlayer().y);
    }
    // オプション追加
    child.setScale(0.5);              // スケールを設定
    child.setSize(110, 150);          // サイズを設定
    child.enemy_name = "enemy_witch";
    child.enemyHP = 200000;
    child.enemyAP = 3;
    child.enemySpeed = 150;
    child.body.setGravityY(0);
    child.body.setAllowGravity(false);  // 無重力にする。
    child.enemy_damage_cool_time=3;

  });

  // GrimReaperSpriteグループを作成
  enemy_grim_reaper = this.physics.add.group({
    key: "GrimReaperSprite",
    frames: this.anims.generateFrameNumbers('GrimReaperSprite', { frames: [0, 1, 2, 2, 1, 0] }),
    repeat: 0,
  });
  // アニメーションを作成
  this.anims.create({
    key: 'reaper_anim_left', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('GrimReaperSprite', { frames: [0, 1, 2, 2, 1, 0] }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: 'reaper_anim_right', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('GrimReaperSprite', { frames: [3, 4, 5, 5, 4, 3] }),
    frameRate: 5,
    repeat: -1,
  });
  // 各catEnemyスプライトに対してスケールとサイズを設定
  enemy_grim_reaper.children.iterate(function (child, index) {
    if (index === 0) {
      child.setX(700);
      child.setY(300);
    }
    // オプション追加
    child.setScale(0.5);     // スケールを設定
    child.setSize(100, 140);     // サイズを設定
    child.enemy_name = "enemy_grim_reaper";
    child.enemyHP = 300000;
    child.enemyAP = 5;
    child.enemySpeed = 100;
    child.body.setGravityY(0);
    child.body.setAllowGravity(false);  // 無重力にする。
    child.enemy_damage_cool_time=3;

  });

  // enemy_specterグループを作成
  enemy_specter = this.physics.add.group({
    key: "Specter",
    repeat: 0,
  });
  // アニメーションを作成
  this.anims.create({
    key: 'specter_anim_stand', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('Specter', { frames: [0, 1, 2, 3, 3, 2, 1] }),
    frameRate: 5,
    repeat: -1,
  });
  this.anims.create({
    key: 'specter_anim_attack', // アニメーションのキー
    frames: this.anims.generateFrameNumbers('Specter', { frames: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20.21] }),
    frameRate: 5,
    repeat: -1,
  });
  // enemy_specterスプライトに対してスケールとサイズを設定
  enemy_specter.children.iterate(function (child, index) {
    if (index === 0) {
      child.setX(4000);
      child.setY(3000);
    }
    // オプション追加
    child.setScale(0.3);     // スケールを設定
    child.enemy_name = "enemy_specter";
    child.enemyHP = 1000;
    child.MaxHP = 1000;
    child.enemyAP = 1;
    child.enemySpeed = 100;
    child.body.setGravityY(0);
    child.body.setAllowGravity(false);  // 無重力にする。
    child.setAlpha(1.0); // 透過度を0.5に設定（0から1の範囲で設定）
  });
  // 武器
  sickle = this.physics.add.image(width / 2, height / 2, 'Sickle'); // 物理エンジンを有効にする
  // 画像のスケールを0.2に設定（修正）
  sickle.setScale(0.2);
  sickle.setVisible(false);
  sickle.body.setAllowGravity(false);  // 無重力にする。
  sickle.enemyAP = 10;

  //-----------敵の処理-----------
  // エフェクト
  smoke = this.physics.add.sprite(-100, -100, "smoke");
  // アニメーション設定
  this.anims.create({
    key: "smoke",
    frames: this.anims.generateFrameNumbers('smoke', { frames: [1, 3, 5, 7, 9, 0, 2, 4, 6, 8] }),
    frameRate: 10,
    repeat: 0
  });
  smoke.setVisible(false); // smoke'スプライトを非表示にします。

  // スコアの表示
  score_text_candy = this.add.text(320, 25, ' 0', {
    fontSize: '25px',
    fill: '#000',
    fontFamily: 'fantasy, sans-serif' // フォントの種類を指定
  });
  // スコアの表示
  score_text_stick = this.add.text(450, 25, ' 0', {
    fontSize: '25px',
    fill: '#000',
    fontFamily: 'fantasy, sans-serif' // フォントの種類を指定
  });
  // スコアの表示
  score_text_Lcandy = this.add.text(580, 25, ' 0', {
    fontSize: '25px',
    fill: '#000',
    fontFamily: 'fantasy, sans-serif' // フォントの種類を指定
  });
  // スコアの表示
  score_text_sweet = this.add.text(720, 25, ' 0', {
    fontSize: '25px',
    fill: '#000',
    fontFamily: 'fantasy, sans-serif' // フォントの種類を指定
  });
  // HPの表示
  HP_text = this.add.text(25, 28, ' 0', {
    fontSize: '25px',
    fill: '#000',
    fontFamily: 'fantasy, sans-serif' // フォントの種類を指定
  });
  
  const textBox = this.add.graphics();
  textBox.fillStyle(0x000000, 0.5); // 半透明の黒
  textBox.fillRect(width / 2 - 150, height / 2 - 100, 300, 100);

  const text = this.add.text(width / 2 - 80, height / 2 - 60, "Stage １－２", {
    font: "24px Arial",
    fill: "#ffffff" // 白色の文字
  });
  text.setAlpha(0); // 最初は非表示

  // テキストボックスとテキストのフェードインアニメーション
  this.tweens.add({
    targets: [text, textBox],
    alpha: 1, // フェードイン後のアルファ値
    duration: 1000, // フェードインにかける時間（1秒）
    ease: 'Linear', // イージング関数（線形）
    onComplete: () => {
      // フェードインアニメーション完了後の処理

      // テキストボックスとテキストのフェードアウトアニメーション
      this.tweens.add({
        targets: [text, textBox],
        alpha: 0, // フェードアウト後のアルファ値
        duration: 1000, // フェードアウトにかける時間（1秒）
        ease: 'Linear', // イージング関数（線形）
        delay: 1000, // フェードインアニメーション完了後から1秒遅延
      });
    },
  });

  // プレイヤーと地面の当たった時
  this.physics.add.collider(player, platforms);
  // 敵同士当たり判定をつける
  this.physics.add.collider(enemy_ghost, enemy_ghost);
  this.physics.add.collider(enemy_witch, enemy_witch);
  this.physics.add.collider(enemy_grim_reaper, enemy_grim_reaper);
  // プレイヤーと敵の当たり判定を取得するが、物理計算は行わない
  this.physics.add.overlap(player, warp, hitwarp2, null, this);
  this.physics.add.overlap(player, enemy_ghost, hitenemy, null, this);
  this.physics.add.overlap(player, enemy_ghost, hitenemy, null, this);
  this.physics.add.overlap(player, enemy_witch, hitenemy, null, this);
  this.physics.add.overlap(player, enemy_grim_reaper, hitenemy, null, this);
  // ライトと星が当たったら
  this.physics.add.overlap(hitchek, enemy_ghost, collectEnemy, null, this);
  this.physics.add.overlap(hitchek, enemy_witch, collectEnemy, null, this);
  this.physics.add.overlap(hitchek, enemy_grim_reaper, collectEnemy, null, this);
  // overlapは重なったときに跳ね返らない
  // colliderは重なったときに跳ね返る
  // playerとstartsをcolliderにした場合はplayerが星の上から落ちるときに跳ね返る

}


