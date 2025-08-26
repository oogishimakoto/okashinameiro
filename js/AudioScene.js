// AudioManager.js
var BGMvolume = 0.1;
var SEvolume = 0.1;
let mouseX, mouseY; // mouseX と mouseY を宣言・定義
let gameMouseX, gameMouseY; // mouseX と mouseY を宣言・定義
// マウスボタンの状態を追跡するための変数
let isMouseDown = false;

class AudioManager extends Phaser.Scene {
    constructor() {
        super({ key: 'AudioManager' });
    }

    create() {

        // 全ての音を止める
        this.sound.stopAll();
        // BGMを再生
        const AudioBgm = this.sound.add('AudioBgm');
        AudioBgm.play({
            volume: BGMvolume,// volumeの種類設定
            loop: true        // ループ設定
        });
        AudioBgm.setVolume(BGMvolume);// 音量を設定

        const AudioSE = this.sound.add('SwitchButton');

        // 背景
        this.add.image(width / 2, height / 2, 'sky');
        // 音量ゲージ
        var ivy_bgm = this.physics.add.sprite(440, 180, 'ivy');
        ivy_bgm.setScale(0.9);
        ivy_bgm.body.setAllowGravity(false);// 無重力にする。
        var ivy_se = this.physics.add.sprite(440, 395, 'ivy');
        ivy_se.setScale(0.9);
        ivy_se.body.setAllowGravity(false);// 無重力にする。

        // カボチャBGMの画像
        var Pumpkin_bgm = this.physics.add.sprite(440, 180, 'Pumpkin');
        Pumpkin_bgm.setScale(0.4);
        Pumpkin_bgm.body.setAllowGravity(false);// 無重力にする。
        // カボチャSEの画像
        var Pumpkin_se = this.physics.add.sprite(440, 395, 'PumpkinSE');
        Pumpkin_se.setScale(0.4);
        Pumpkin_se.body.setAllowGravity(false);// 無重力にする。

        let Option = this.add.image(650, 500, 'OptionTitleScene');
        Option.setScale(0.3);
        // スプライトに「pointerdown」イベントリスナーを追加
        Option.setInteractive(); // スプライトを対話的にする
        Option.on('pointerdown', function () {
            // ここで別のシーンに遷移します
            this.scene.start('TitleScene'); // '次のシーンのキー'を次に遷移したいシーンのキーに置き換えてください
        }, this);



        // BGM音量調整設定
        addEventListener('mousemove', function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            gameMouseX = mouseX - game.canvas.offsetLeft;
            gameMouseY = mouseY - game.canvas.offsetTop;
            var Max_volume = 610;// 音量ゲージの右端
            var Min_valume = 270;// 音量ゲージの右端

            // マウスとカボチャの距離
            const distance = Phaser.Math.Distance.Between(gameMouseX, gameMouseY, Pumpkin_bgm.x, Pumpkin_bgm.y);

            // マウスボタンが押されている場合のみ動かせるようにする
            if (isMouseDown && distance <= 33 && gameMouseX >= Min_valume && gameMouseX <= Max_volume) {
                Pumpkin_bgm.setPosition(gameMouseX, 180);
                // gameMouseXが270の場合はBGMvolumeを0に設定
                // gameMouseXが610の場合はBGMvolumeを1に設定
                // その間のgameMouseXの値については、線形補間を行います
                BGMvolume = (gameMouseX - 270) / (610 - 270);
                AudioBgm.setVolume(BGMvolume);// 音量を設定
            }
        });

        // SE音量調整設定
        addEventListener('mousemove', function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            gameMouseX = mouseX - game.canvas.offsetLeft;
            gameMouseY = mouseY - game.canvas.offsetTop;
            var Max_volume = 610;// 音量ゲージの右端
            var Min_valume = 270;// 音量ゲージの右端

            // マウスとカボチャの距離
            const distance = Phaser.Math.Distance.Between(gameMouseX, gameMouseY, Pumpkin_se.x, Pumpkin_se.y);

            // マウスボタンが押されている場合のみ動かせるようにする
            if (isMouseDown && distance <= 33 && gameMouseX >= Min_valume && gameMouseX <= Max_volume) {
                Pumpkin_se.setPosition(gameMouseX, 395);
                // gameMouseXが270の場合はBGMvolumeを0に設定
                // gameMouseXが610の場合はBGMvolumeを1に設定
                // その間のgameMouseXの値については、線形補間を行います
                SEvolume = (gameMouseX - 270) / (610 - 270);
                // BGMを再生
                AudioSE.setVolume(SEvolume);// 音量を設定

            }
        });

        // マウスボタンを押したときのイベントリスナー
        addEventListener('mousedown', function (event) {
            // 左マウスボタン
            if (event.button === 0) {
                isMouseDown = true;

            }

        });

        // マウスボタンを離したときのイベントリスナー
        addEventListener('mouseup', function (event) {
            // 左マウスボタン（ボタン0）が離されているかを確認
            if (event.button === 0) {
                isMouseDown = false;
                AudioSE.play({
                    volume: SEvolume,// volumeの種類設定
                    loop: false        // ループ設定
                });

            }
        });

        // ゲーム内でこの関数を呼び出してキーボード入力を取得
        const keys = createKeyboardKeys(this);
        this.input.keyboard.on('keydown-ESC', function (event) {
            SwitchButton = this.sound.add('SwitchButton', { volume: SEvolume });
            SwitchButton.play();
            SwitchButton.once('complete', () => {
                this.scene.start('TitleScene');
            });
        }, this);
        let player_AP_PowerUP = this.add.image(410, 540, 'Sweet');
        player_AP_PowerUP.setScale(0.5);
        // スプライトに「pointerdown」イベントリスナーを追加
        player_AP_PowerUP.setInteractive(); // スプライトを対話的にする
        player_AP_PowerUP.on('pointerdown', function () {
            // ここで別のシーンに遷移します
            player_AP += 1000;
            if (player_AP >= 9999) {
                player_AP = 9999;
            }
        }, this);


        let PowerUP = this.add.image(300, 540, 'Sweet');
        PowerUP.setScale(0.5);
        // スプライトに「pointerdown」イベントリスナーを追加
        PowerUP.setInteractive(); // スプライトを対話的にする
        PowerUP.on('pointerdown', function () {
            // ここで別のシーンに遷移します
            player_Max_HP += 100;
            playerHP += 100;
            if (playerHP >= 999) {
                playerHP = 999;
                player_Max_HP = 999;
            }
        }, this);

    }

}


