
async function game_update() {
  // ゲーム内でこの関数を呼び出してキーボード入力を取得
  const keys = createKeyboardKeys(this);

  score_text_candy.setText(' ' + score_candy);
  score_text_stick.setText(' ' + score_stick);
  score_text_Lcandy.setText(' ' + score_Lcandy);
  score_text_sweet.setText(' ' + score_sweet);
  HP_text.setText("HP" + playerHP + "/" + player_Max_HP);
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
  if (gameOver && reset_check === false) {
    // 物理エンジン再開
    // restart()の中ではthisが使えないようだったのでここでresumeする
    kaakaaSe = this.sound.add('kaakaaSe', { volume: SEvolume });
    kaakaaSe.play();

    this.physics.resume();
    kaakaaSe.once('complete', () => {
      // SEが終了後開始
      this.scene.start('ResultScene');
    });
    restart();
    return;
  }
}

function collectEnemy(obj, obj2) {
  var canDamage = true; // ダメージを与えることができるかどうかのフラグ
  EnemyAnimation(obj, obj2);
  var knockbackDistance = 5; // ノックバックの距離（適宜調整）
  const distance = Phaser.Math.Distance.Between(obj.x, obj.y, obj2.x, obj2.y); // オブジェクト間の距離を計算
  // オブジェクト間の角度を計算し、度数法で表現
  let angleInDegrees = (Phaser.Math.Angle.BetweenPoints(obj, obj2) * Phaser.Math.RAD_TO_DEG) + 90;
  // 角度が負の場合、正の値に変換
  if (angleInDegrees < 0) { angleInDegrees += 360; }
  // 距離が一定範囲内かつ角度が指定の範囲内の場合
  obj2.enemy_damage_cool_time--;
  console.log(obj2.enemy_damage_cool_time);
  if (distance <= 140 && angleInDegrees >= loadight_angleH - 15 && angleInDegrees <= loadight_angleL + 15) {
    if (obj2.enemy_damage_cool_time < 0) {
      obj2.enemy_damage_cool_time = 3;
      Damage = this.sound.add('Damage', { volume: SEvolume });
      Damage.play();

      canDamage = false; // ダメージを与える前にフラグを無効に設定
      let randomDamage = Math.floor(Math.random() * 9999) + player_AP;     // ランダムなダメージを計算
      if (randomDamage >= 9999) {
        randomDamage = 9999;
      }
      const random_damage_textX = Math.floor(Math.random() * 80) - 40;    // 位置をズレさす
      const random_damage_textY = Math.floor(Math.random() * 50) + 0;     // 位置をズレさす

      obj2.enemyHP -= randomDamage; // エネミーのHPを減少

      var smokeList = [];   // スモークアニメーション用のスプライトリスト

      if (obj2.enemyHP <= 0) {
        EnemyDown = this.sound.add('EnemyDown', { volume: SEvolume });
        EnemyDown.play();

        obj2.disableBody(true, true); // エネミーを無効化
        var smoke = this.physics.add.sprite(obj2.x, obj2.y, 'smoke'); // 煙アニメーション作成
        //smokeの設定
        smoke.body.setAllowGravity(false);// 無重力にする。
        smoke.anims.play('smoke', true);
        smoke.on('animationcomplete', function (animation, frame) {
          if (animation.key === 'smoke') {// アニメーションが完了したら
            smokeList.splice(smokeList.indexOf(smoke), 1);// リストの中身を確認し
            smoke.destroy(); // スプライトを削除します。
          }
        }, this);
        // スモークアニメーションスプライトをリストに追加
        smokeList.push(smoke);
      }
      else {
        // ノックバック処理
        const knockbackAngle = Phaser.Math.Angle.Between(obj2.x, obj2.y, obj.x, obj.y);
        const knockbackX = obj2.x - knockbackDistance * Math.cos(knockbackAngle);
        const knockbackY = obj2.y - knockbackDistance * Math.sin(knockbackAngle);
        obj2.setPosition(knockbackX, knockbackY); // エネミーをノックバック
      }
      // フェードアウトアニメーションの設定
      const fadeOutDuration = 1000; // フェードアウトにかかる時間（ミリ秒）
      const alphaEnd = 0; // 最終的な透明度
      const ifncreased_value = 150; // 最終的な透明度
      let number_of_digits = 0;
      let obj2_x_position = 0;
      let obj2_x_position2 = 0;
      let obj2_x_position3 = 0;
      let obj2_x_position4 = 0;
      const randomX = Math.floor(Math.random() * 31) - 15;
      const position_Y = -40;
      const thirdDigit1 = Math.floor(randomDamage / 1) % 10;// 1桁目の数字を取得
      const thirdDigit2 = Math.floor(randomDamage / 10) % 10;// 2桁目の数字を取得
      const thirdDigit3 = Math.floor(randomDamage / 100) % 10;// 3桁目の数字を取得
      const thirdDigit4 = Math.floor(randomDamage / 1000) % 10;// 4桁目の数字を取得
      const damage_frame = this.add.sprite(obj2.x + randomX, obj2.y - 50, 'DamageFrame', 0);
      damage_frame.setScale(0.5);
      if (thirdDigit4 > 0) { obj2_x_position = 30 + randomX; obj2_x_position2 = 10 + randomX; obj2_x_position3 = -10 + randomX; obj2_x_position4 = -30 + randomX; }
      else if (thirdDigit3 > 0) { obj2_x_position = 20 + randomX; obj2_x_position2 = 0 + randomX; obj2_x_position3 = -20 + randomX; }
      else if (thirdDigit2 > 0) { obj2_x_position = 10 + randomX; obj2_x_position2 = -10 + randomX }
      else { }
      console.log("4桁目" + thirdDigit4);
      console.log("3桁目" + thirdDigit3);
      console.log("2桁目" + thirdDigit2);
      console.log("1桁目" + thirdDigit1);
      console.log("現在のダメージ" + randomDamage);


      // フェードアウトアニメーションを設定
      this.tweens.add({
        targets: damage_frame,
        alpha: 0.3, // 透明度を0に変更してフェードアウト
        duration: fadeOutDuration,
        onComplete: () => {
          // アニメーションが完了した後の処理をここに記述
          damage_frame.destroy(); // スプライトを削除するなど
          damage_frame.destroy(); // スプライトを削除するなど
        }
      });
      const damageNumber1 = this.add.sprite(obj2.x + obj2_x_position, obj2.y + position_Y, 'Numbers', thirdDigit1);
      damageNumber1.setScale(0.3);
      // フェードアウトアニメーションを設定
      this.tweens.add({
        targets: damageNumber1,
        alpha: alphaEnd, // 透明度を0に変更してフェードアウト
        duration: fadeOutDuration,
        onComplete: () => {
          // アニメーションが完了した後の処理をここに記述
          damageNumber1.destroy(); // スプライトを削除するなど
        }
      });
      // スプライトの左右に揺れるアニメーションを追加
      this.tweens.add({
        targets: damageNumber1,
        x: damageNumber1.x + randomX, // 右に10ピクセル揺れる
        duration: 600, // アニメーションの期間（ミリ秒）
        yoyo: true, // アニメーションが戻るように設定
        repeat: -1, // 無限に繰り返す
      });
      // スプライトの上昇アニメーションを追加
      this.tweens.add({
        targets: damageNumber1,
        y: damageNumber1.y - ifncreased_value, // 上に50ピクセル上昇
        duration: 1000, // アニメーションの期間（ミリ秒）
      });

      if (thirdDigit2 > 0 || thirdDigit3 > 0 || thirdDigit4 > 0) {
        const damageNumber2 = this.add.sprite(obj2.x + obj2_x_position2, obj2.y + position_Y, 'Numbers', thirdDigit2);
        damageNumber2.setScale(0.3);
        number_of_digits += 1;
        // フェードアウトアニメーションを設定
        this.tweens.add({
          targets: damageNumber2,
          alpha: alphaEnd, // 透明度を0に変更してフェードアウト
          duration: fadeOutDuration,
          onComplete: () => {
            // アニメーションが完了した後の処理をここに記述
            damageNumber2.destroy(); // スプライトを削除するなど
          }
        });
        // スプライトの左右に揺れるアニメーションを追加
        this.tweens.add({
          targets: damageNumber2,
          x: damageNumber2.x + randomX, // 右に10ピクセル揺れる
          duration: 600, // アニメーションの期間（ミリ秒）
          yoyo: true, // アニメーションが戻るように設定
          repeat: -1, // 無限に繰り返す
        });
        // スプライトの上昇アニメーションを追加
        this.tweens.add({
          targets: damageNumber2,
          y: damageNumber2.y - ifncreased_value, // 上に50ピクセル上昇
          duration: 1000, // アニメーションの期間（ミリ秒）
        });
      }

      if (thirdDigit3 > 0 || thirdDigit4 > 0) {
        const damageNumber3 = this.add.sprite(obj2.x + obj2_x_position3, obj2.y + position_Y, 'Numbers', thirdDigit3);
        damageNumber3.setScale(0.3);
        number_of_digits += 1;
        obj2_x_position = 40;

        // フェードアウトアニメーションを設定
        this.tweens.add({
          targets: damageNumber3,
          alpha: alphaEnd, // 透明度を0に変更してフェードアウト
          duration: fadeOutDuration,
          onComplete: () => {
            // アニメーションが完了した後の処理をここに記述
            damageNumber3.destroy(); // スプライトを削除するなど
          }
        });
        // スプライトの左右に揺れるアニメーションを追加
        this.tweens.add({
          targets: damageNumber3,
          x: damageNumber3.x + randomX, // 右に10ピクセル揺れる
          duration: 600, // アニメーションの期間（ミリ秒）
          yoyo: true, // アニメーションが戻るように設定
          repeat: -1, // 無限に繰り返す
        });
        // スプライトの上昇アニメーションを追加
        this.tweens.add({
          targets: damageNumber3,
          y: damageNumber3.y - ifncreased_value, // 上に50ピクセル上昇
          duration: 1000, // アニメーションの期間（ミリ秒）
        });
      }

      if (thirdDigit4 > 0) {
        const damageNumber4 = this.add.sprite(obj2.x + obj2_x_position4, obj2.y + position_Y, 'Numbers', thirdDigit4);
        damageNumber4.setScale(0.3);
        number_of_digits += 1;
        obj2_x_position = 60;
        // フェードアウトアニメーションを設定
        this.tweens.add({
          targets: damageNumber4,
          alpha: alphaEnd, // 透明度を0に変更してフェードアウト
          duration: fadeOutDuration,
          onComplete: () => {
            // アニメーションが完了した後の処理をここに記述
            damageNumber4.destroy(); // スプライトを削除するなど
          }
        });
        // スプライトの左右に揺れるアニメーションを追加
        this.tweens.add({
          targets: damageNumber4,
          x: damageNumber4.x + randomX, // 右に10ピクセル揺れる
          duration: 600, // アニメーションの期間（ミリ秒）
          yoyo: true, // アニメーションが戻るように設定
          repeat: -1, // 無限に繰り返す
        });
        // スプライトの上昇アニメーションを追加
        this.tweens.add({
          targets: damageNumber4,
          y: damageNumber4.y - ifncreased_value, // 上に50ピクセル上昇
          duration: 1000, // アニメーションの期間（ミリ秒）
        });
      }


      // 一定時間後にダメージテキストを削除
      setTimeout(function () {
        canDamage = true;
      }, enemy_damage_cool_time);
      // スプライトの左右に揺れるアニメーションを追加
      this.tweens.add({
        targets: damage_frame,
        x: damage_frame.x + randomX, // 右に10ピクセル揺れる
        duration: 600, // アニメーションの期間（ミリ秒）
        yoyo: true, // アニメーションが戻るように設定
        repeat: -1, // 無限に繰り返す
      });
      // スプライトの上昇アニメーションを追加
      this.tweens.add({
        targets: damage_frame,
        y: damage_frame.y - ifncreased_value, // 上に50ピクセル上昇
        duration: 1000, // アニメーションの期間（ミリ秒）
      });


    }
    var drop_rate = Math.floor(Math.random() * (drop_rate_max - drop_rate_min + 1)) + drop_rate_min;
    // ドロップアイテム
    if (obj2.enemy_name === "enemy_ghost" && obj2.enemyHP <= 0 && drop_rate >= 20) {
      var candy = this.physics.add.sprite(obj2.x, obj2.y, 'candy'); // ドロップアイテム作成
      this.physics.add.collider(platforms, candy);
      candy.setBounce(0.2);             // アイテムをバウンドさせる 
      candy.setScale(0.25);

    }
    else if (obj2.enemy_name === "enemy_ghost" && obj2.enemyHP <= 0) {
      var stick_candy = this.physics.add.sprite(obj2.x, obj2.y, 'StickCandy'); // ドロップアイテム作成
      this.physics.add.collider(platforms, stick_candy);
      stick_candy.setBounce(0.2);             // アイテムをバウンドさせる 
      stick_candy.setScale(0.25);
    }

    // ドロップアイテム
    if (obj2.enemy_name === "enemy_witch" && obj2.enemyHP <= 0 && drop_rate >= 20) {
      var stick_candy = this.physics.add.sprite(obj2.x, obj2.y, 'StickCandy'); // ドロップアイテム作成
      this.physics.add.collider(platforms, stick_candy);
      stick_candy.setBounce(0.2);             // アイテムをバウンドさせる 
      stick_candy.setScale(0.25);
    }
    else if (obj2.enemy_name === "enemy_witch" && obj2.enemyHP <= 0) {
      var candyL = this.physics.add.sprite(obj2.x, obj2.y, 'SpinCandy'); // ドロップアイテム作成
      this.physics.add.collider(platforms, candyL);
      candyL.setBounce(0.2);             // アイテムをバウンドさせる 
      candyL.setScale(0.25);
    }


    if (obj2.enemy_name === "enemy_grim_reaper" && obj2.enemyHP <= 0 && drop_rate >= 5) {
      var candyL = this.physics.add.sprite(obj2.x, obj2.y, 'SpinCandy'); // ドロップアイテム作成
      this.physics.add.collider(platforms, candyL);
      candyL.setBounce(0.2);             // アイテムをバウンドさせる 
      candyL.setScale(0.25);
    }
    else if (obj2.enemy_name === "enemy_grim_reaper" && obj2.enemyHP <= 0 && drop_rate <= 5) {
      var sweet = this.physics.add.sprite(obj2.x, obj2.y, 'Sweet'); // ドロップアイテム作成
      this.physics.add.collider(platforms, sweet);
      sweet.setBounce(0.2);             // アイテムをバウンドさせる 
      sweet.setScale(0.25);
    }
    if (obj2.enemy_name === "enemy_specter" && obj2.enemyHP <= 0) {
      this.scene.start('GameClearScene');
    }

  }

  // プレイヤーとアイテムのコリジョンを追加
  this.physics.add.overlap(player, candy, function (player, item) {

    // 飴に触れた場合、スコアを1増やす
    score_candy += 1;
    // アイテムごとにスコアの足すところを変える
    score_text_candy.setText(' ' + score_candy);
    item.destroy(); // アイテムを削除
  });
  this.physics.add.overlap(player, candyL, function (player, item) {

    // 飴に触れた場合、スコアを1増やす
    score_Lcandy += 1;
    // アイテムごとにスコアの足すところを変える
    score_text_Lcandy.setText(' ' + score_Lcandy);
    item.destroy(); // アイテムを削除
  });
  this.physics.add.overlap(player, stick_candy, function (player, item) {

    // 飴に触れた場合、スコアを1増やす
    score_stick += 1;
    // アイテムごとにスコアの足すところを変える
    score_text_stick.setText(' ' + score_stick);
    item.destroy(); // アイテムを削除
  });
  // プレイヤーとアイテムのコリジョンを追加
  this.physics.add.overlap(player, sweet, function (player, item) {

    // 飴に触れた場合、スコアを1増やす
    score_sweet += 1;
    // アイテムごとにスコアの足すところを変える
    score_text_sweet.setText(' ' + score_sweet);
    item.destroy(); // アイテムを削除
  });

}

function hitwarp(player, enemy) {
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
    console.log(total_score);
    console.log(Stage1_1);
    if (Stage1_1 < total_score) {
      tutorial_one = undefined;
      tutorial_two = undefined;
      tutorial_three = undefined;

      this.scene.start('Stage1');
    } else {
      tutorial_one = undefined;
      tutorial_two = undefined;
      tutorial_three = undefined;

      this.scene.start('GameScene');
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

// プレイヤーと敵と衝突時突時
function hitenemy(player, enemy) {
  if (damage_cool_time <= 0) {
    damage_cool_time = 250;

    // プレイヤーを点滅させるアニメーション
    let isFadingOut = false;
    const blinkInterval = 100; // 点滅のインターバル (ミリ秒)

    const blinkTimer = this.time.addEvent({
      delay: blinkInterval,
      repeat: 9, // 10回点滅する（1秒間で5回点滅）
      callback: function () {
        if (isFadingOut) {
          player.setAlpha(1); // プレイヤーを元に戻す
        } else {
          player.setAlpha(0); // プレイヤーを透明にする
        }
        isFadingOut = !isFadingOut;
      },
      callbackScope: this,
      onComplete: function () {
        player.setAlpha(1); // プレイヤーを最終的に元に戻す
      },
    });
    playerHP -= enemy.enemyAP;
    if (playerHP <= 0) {
      gameOver = true;
      playerHP = 0;
    }
  }
}

function restart() {
  // ゲームオーバーフラグクリア
  gameOver = false;

}

function Positionlight() {
  // プレイヤーの位置に応じて扇形の位置を更新
  light.clear();
  const circleRadius = 100;
  var startAngleInDegrees = loadight_angleH - 90;
  var endAngleInDegrees = loadight_angleL - 90;

  const startAngle = (startAngleInDegrees * Math.PI) / 180;
  const endAngle = (endAngleInDegrees * Math.PI) / 180;
  light.fillStyle(0xFFFF00, 0.5);
  light.beginPath();
  light.width = circleRadius * 2;  // 扇形の幅
  light.height = circleRadius * 2;  // 扇形の高さ

  light.moveTo(player.x, player.y + lightY);
  light.arc(player.x, player.y + lightY, circleRadius, startAngle, endAngle, false);
  light.lineTo(player.x, player.y + lightY);
  light.fillPath();
}


function player_input(keys) {

  if (keys['A'].isDown && player_direction === true) {
    // プレイヤーを左に移動させる
    player.setVelocityX(playerMoveL);
  }
  else if (keys['A'].isDown && player_direction === false) {
    // プレイヤーを左に移動させる
    player.setVelocityX(playerMoveL / 2);
  }
  else if (keys['D'].isDown && player_direction === false) {
    // プレイヤーを右に移動させる
    player.setVelocityX(playerMoveR);
  }
  else if (keys['D'].isDown && player_direction === true) {
    // プレイヤーを右に移動させる
    player.setVelocityX(playerMoveR / 2);
  }
  else {
    // プレイヤーの横方向の速度をゼロに設定して停止させる
    player.setVelocityX(0);
  }
  // プレイヤーのジャンプ処理
  if (keys[' '].isDown && player.body.touching.down) {
    player.setVelocityY(playerJumpPower);
  }

}

function anim_input(keys) {
  if (loadight_angleL >= 65 && loadight_angleL <= 200) {
    // プレイヤーの右アニメーション
    if (keys['D'].isDown || keys['A'].isDown) {
      player.anims.play('right', true);
    }
    else {
      player.anims.play('right', false);
    }
  }
  else {
    // プレイヤーの左アニメーション
    if (keys['D'].isDown || keys['A'].isDown) {
      player.anims.play('left', true);
    }
    else {
      player.anims.play('left', false);
    }
  }
}
function ligeht_angle() {
  // ライトの向きを左にする1秒の待ち時間をもたせる
  if (cursors.left.isDown && cool_time_input > 200) {
    loadight_angleH = 245;
    loadight_angleL = 300;
    cool_time_input = 0;
    player_direction = true;
  }
  //ライトの向きを右方向に変える
  if (cursors.right.isDown && cool_time_input > 200) {
    loadight_angleH = 65;
    loadight_angleL = 120;
    cool_time_input = 0;

    player_direction = false;
  }
  // Rライトの角度を上に上げる
  if (cursors.up.isDown && loadight_angleL > 90 && player_direction === false) {
    loadight_angleH -= 1;
    loadight_angleL -= 1;
  }
  else if (cursors.down.isDown && loadight_angleL < 140 && player_direction === false) {
    loadight_angleH += 1;
    loadight_angleL += 1;
  }
  // Lライトの角度を下に下げる
  if (cursors.up.isDown && loadight_angleL < 320 && player_direction === true) {
    loadight_angleH += 1;
    loadight_angleL += 1;
  }
  else if (cursors.down.isDown && loadight_angleL > 270 && player_direction === true) {
    loadight_angleH -= 1;
    loadight_angleL -= 1;
  }
}
function EnemyAI() {
  // グループ内の各敵に対して処理を行います
  enemy_grim_reaper.children.iterate(function (enemy) {
    // 敵とプレイヤーの間の角度を計算します
    var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    // プレイヤーと敵の距離を計算
    var distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (distance <= 350 && enemy.enemy_name === "enemy_grim_reaper") {
      enemy.setVelocityX(Math.cos(angle) * enemy.enemySpeed);
      enemy.setVelocityY(Math.sin(angle) * enemy.enemySpeed);
    } else {
      enemy.setVelocityX(0); // X方向の速度を0に設定して停止
      enemy.setVelocityY(0); // Y方向の速度を0に設定して停止
    }
  });


  // グループ内の各敵に対して処理を行います
  enemy_witch.children.iterate(function (enemy) {
    // 敵とプレイヤーの間の角度を計算します
    var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    // プレイヤーと敵の距離を計算
    var distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (distance <= 350 && enemy.enemy_name === "enemy_witch") {
      enemy.setVelocityX(Math.cos(angle) * enemy.enemySpeed);
      enemy.setVelocityY(Math.sin(angle) * enemy.enemySpeed);
    } else {
      enemy.setVelocityX(0); // X方向の速度を0に設定して停止
      enemy.setVelocityY(0); // Y方向の速度を0に設定して停止
    }
  });



  enemy_ghost.children.iterate(function (enemy) {
    // 敵とプレイヤーの間の角度を計算します
    var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    // プレイヤーと敵の距離を計算
    var distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (distance <= 350 && enemy.enemy_name === "enemy_ghost") {
      enemy.setVelocityX(Math.cos(angle) * enemy.enemySpeed);
      enemy.setVelocityY(Math.sin(angle) * enemy.enemySpeed);
    } else {
      enemy.setVelocityX(0); // X方向の速度を0に設定して停止
      enemy.setVelocityY(0); // Y方向の速度を0に設定して停止
    }
  });


  enemy_johnny.children.iterate(function (enemy) {
    // 敵とプレイヤーの間の角度を計算します
    var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    // プレイヤーと敵の距離を計算
    var distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (enemy.enemyHP === enemy.MaxHP) { }
    else {
      enemy.setVelocityX(Math.cos(angle) * enemy.enemySpeed);
      enemy.setVelocityY(Math.sin(angle) * enemy.enemySpeed);
      attack_interval++;
      const attack_interval_time = 1000;
      if (attack_interval_time < attack_interval) {
        attack_interval = 0;
        yamiScale = yamiScale + 0.01;
        if (yamiScale >= 0.3) { yamiScale = 0.3; }
        yami.play('Yami', true);
        yami.setScale(yamiScale);
        yami.setVisible(true); // smoke'スプライトを非表示にします。
        // プレイヤーの位置
        var playerX = player.x;
        var playerY = player.y;

        // ランダムな角度と距離を生成
        var randomAngle = Math.random() * Math.PI * 2; // 0から2πのランダムな角度を生成
        var randomDistance = Math.random() * 300; // 0から300のランダムな距離を生成

        // 新しい位置を計算
        var newX = playerX + randomDistance * Math.cos(randomAngle);
        var newY = playerY + randomDistance * Math.sin(randomAngle);


        // 新しい位置が画面外に出ないように制限
        newX = Phaser.Math.Clamp(newX, 0, width);
        newY = Phaser.Math.Clamp(newY, 0, height);

        // 'yami' オブジェクトの位置を新しいランダムな位置に設定
        yami.setPosition(newX, newY);

      }
    }

  });

  enemy_specter.children.iterate(function (enemy) {
    // 敵とプレイヤーの間の角度を計算します
    var angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
    // プレイヤーと敵の距離を計算
    var distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);
    if (enemy.enemyHP === enemy.MaxHP) {
      enemy.anims.play('specter_anim_stand', true);
    }
    else {

      blink_time++;
      sickle_rotation--;
      sickle.setRotation(Phaser.Math.DEG_TO_RAD * sickle_rotation * 10);

      const cool_time = 1000;
      if (distance <= 1300 && enemy.enemy_name === "enemy_specter" && cool_time < blink_time) {
        blink_time = 0;
        const animationDuration = 1000; // 1秒
        const framesPerSecond = 60; // 60フレーム/秒（設定可能）

        const initialAlpha = 0.0;
        const targetAlpha = 1.0;
        const alphaIncrement = (targetAlpha - initialAlpha) / (animationDuration / 1000 * framesPerSecond); // アルファ値の増加量

        let currentAlpha = initialAlpha;

        const updateAlpha = () => {
          if (currentAlpha < targetAlpha) {
            currentAlpha += alphaIncrement;
            enemy.setAlpha(currentAlpha);

            requestAnimationFrame(updateAlpha);
          }
        };

        updateAlpha();
        enemy.setX(getRandomPositionAwayFromPlayer().x);
        enemy.setY(getRandomPositionAwayFromPlayer().y);
        enemy.setAlpha(1.0);
        // 武器


        sickle.setVisible(true); // sickleを非表示にする
        sickle.x = enemy.x;
        sickle.y = enemy.y;
        // プレイヤーとサイクルの座標を取得
        const playerX = player.x;
        const playerY = player.y;
        const sickleX = sickle.x;
        const sickleY = sickle.y;

        // プレイヤーとサイクルの間の角度を計算
        const angle = Phaser.Math.Angle.Between(sickleX, sickleY, playerX, playerY);

        // 速度を計算（適切な速度を設定してください）
        const speed = 300; // 速度を調整
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        // サイクルに速度を設定
        sickle.setVelocityX(velocityX);
        sickle.setVelocityY(velocityY);

      }
      else {
        enemy.setVelocityX(0); // X方向の速度を0に設定して停止
        enemy.setVelocityY(0); // Y方向の速度を0に設定して停止
      }
    }

  });


}


function EnemyAnimation(obj, obj2) {
  if (obj.x < obj2.x && obj2.enemy_name === "enemy_grim_reaper") {
    obj2.anims.play('reaper_anim_left', true);
  }
  else if (obj.x > obj2.x && obj2.enemy_name === "enemy_grim_reaper") {
    obj2.anims.play('reaper_anim_right', true);
  }
  if (obj.x < obj2.x && obj2.enemy_name === "enemy_witch") {
    obj2.anims.play('witchSprite_anim_left', true);
  }
  else if (obj.x > obj2.x && obj2.enemy_name === "enemy_witch") {
    obj2.anims.play('witchSprite_anim_right', true);
  }
  if (obj.x < obj2.x && obj2.enemy_name === "enemy_ghost") {
    obj2.anims.play('GhostSprite_anim_left', true);
  }
  else if (obj.x > obj2.x && obj2.enemy_name === "enemy_ghost") {
    obj2.anims.play('GhostSprite_anim_right', true);
  }
  else { }
}
function getRandomPositionAwayFromPlayer() {
  let x, y;

  do {
    // Generate random x and y coordinates
    x = Phaser.Math.Between(0, width); // Adjust the range as needed
    y = Phaser.Math.Between(0, height); // Adjust the range as needed
  } while (Phaser.Math.Distance.Between(x, y, player.x, player.y) < minDistance);

  return { x, y };
}