
async function BossUpdate() {
  // ゲーム内でこの関数を呼び出してキーボード入力を取得
  const keys = createKeyboardKeys(this);
  score_text_candy.setText(' ' + score_candy);
  score_text_stick.setText(' ' + score_stick);
  score_text_Lcandy.setText(' ' + score_Lcandy);
  score_text_sweet.setText(' ' + score_sweet);
  HP_text.setText("HP" + playerHP + "/"+player_Max_HP);
  // アニメーションをスプライトに設定
  warp.anims.play('warp_play', true);
  background.anims.play('background', true);
  
  damage_cool_time -= 1;
  // 入力の待ち時間
  cool_time_input++;
  // ライトの位置を更新処理
  Positionlight();
  // 当たり判定の処理
  hitchek.setPosition(player.x, player.y);
  // プレイヤーの入力処理
  player_input(keys);
  // アニメーションの処理
  anim_input(keys);
  // ライトの向きの設定
  ligeht_angle();
  // 敵の処理
  EnemyAI();
  // ゲームオーバの仕様ができてないため放置
  if (gameOver&&reset_check===false) {
    // 物理エンジン再開
    // restart()の中ではthisが使えないようだったのでここでresumeする
    kaakaaSe = this.sound.add('kaakaaSe', { volume: 1.0 });
    kaakaaSe.play();
    reset_check=true;
    this.physics.resume();
    kaakaaSe.once('complete', () => {
      // SEが終了後開始
      this.scene.start('ResultScene');
    });
    restart();
    return;
  }
}

function hitwarpBoss(player, enemy) {
  const keys = createKeyboardKeys(this);
  let Stage1_1 = Math.floor(Math.random() * 100);
  let Stage1_2 = Math.floor(Math.random() * 200) + 100;
  let Stage1_3 = Math.floor(Math.random() * 300) + 200;
  let Stage1_4 = Math.floor(Math.random() * 400) + 300;
  let Stage1_5 = Math.floor(Math.random() * 500) + 500;
  let StageB1_1 = 0;
  let StageB1_2 = 1;
  let StageB1_3 = 2;
  let StageB1_4 = 3;

  total_score = score_candy * bonus_candy + score_stick * bonus_stick + score_Lcandy * bonus_Lcandy;
  if (keys['W'].isDown) {
    console.log("死神");
    console.log(Stage1_1);

    if (Stage1_1 > total_score) {
      this.scene.start('Stage5');
    } else {
      this.scene.start('Stage5');
    }

  }
  const textBox = this.add.graphics();
  textBox.fillStyle(0x000000, 0.1); // 半透明の黒
  textBox.fillRect(width / 2 - 150, height / 2 - 100, 300, 100);

  const text = this.add.text(width / 2 - 120, height / 2 - 60, "【W】？？？に移動", {
    font: "24px Arial",
    fill: "#ffffff" // 白色の文字
  });
  textBox.setAlpha(0.1); // 最初は非表示
  text.setAlpha(0.7); // 最初は非表示

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


}

