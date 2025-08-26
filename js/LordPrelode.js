// LordPrelode.js
let totalAssets = 28;  //アセットの個数
let assetsLoaded = 0;

function load_prelode() {

    // バックグラウンドミュージックを読み込む
    this.load.audio('titlebgm', 'BGM/TitleBgm.mp3');
    this.load.audio('Stage1', 'BGM/Stage1.mp3');
    this.load.audio('Stage2', 'BGM/Stage2.mp3');
    this.load.audio('Stage3', 'BGM/Stage3.mp3');
    this.load.audio('Stage4', 'BGM/Stage4.mp3');
    this.load.audio('Stage5', 'BGM/Stage5.mp3');
    this.load.audio('Boss1', 'BGM/Boss1.mp3');
    this.load.audio('GameOverBgm', 'BGM/GameOverBgm.mp3');
    this.load.audio('AudioBgm', 'BGM/AudioBgm.mp3');
    this.load.audio('SwitchButton', 'BGM/SwitchButton.mp3');
    this.load.audio('StarSe', 'BGM/StarSe.mp3');
    this.load.audio('kaakaaSe', 'BGM/kaakaa.mp3');
    this.load.audio('Damage', 'BGM/Damage.mp3');
    this.load.audio('EnemyDown', 'BGM/Item.mp3');
    this.load.audio('Item', 'BGM/Item.mp3');
    // 画像の読み込み
    this.load.image('Test', 'assets/Test.png')
    this.load.image('Tutorial1', 'assets/Tutorial1.png')
    this.load.image('Tutorial2', 'assets/Tutorial2.png')
    this.load.image('Tutorial3', 'assets/Tutorial3.png')
    this.load.image('TutorialSkip ', 'assets/TutorialSkip .png')
    this.load.image('Icon', 'assets/Icon.png')
    this.load.image('TutorialSkip', 'assets/TutorialSkip.png')
    this.load.image('TutorialOne', 'assets/TutorialOne.png')
    this.load.image('TutorialTwo', 'assets/TutorialTwo.png')
    this.load.image('TutorialThree', 'assets/TutorialThree.png')
    this.load.image('door', 'assets/door.png')                              // ドアの画像
    this.load.image('sky', 'assets/sky.png')                                // ドアの画像
    this.load.image('Pumpkin', 'assets/Pumpkin.png')                        // カボチャの画像                              
    this.load.image('PumpkinSE', 'assets/PumpkinSE.png')                    // カボチャの画像                              
    this.load.image('ivy', 'assets/ivy.png')                                // ツタの画像                                
    this.load.image('Title', 'assets/Title.png')                            // タイトル背景画像
    this.load.image('ground', 'assets/platform.png');                       // 地面の画像
    this.load.image('candy', 'assets/candy.png');                           // アイテム小の画像
    this.load.image('StickCandy', 'assets/StickCandypng.png');              // アイテム中の画像
    this.load.image('SpinCandy', 'assets/SpinCandy.png');                   // アイテム大の画像
    this.load.image('Sweet', 'assets/Sweet.png');                           // 特別なお菓子の画像
    this.load.image('gameover', 'assets/gameover.png');                     // gameoverの画像
    this.load.image('HitCheck', 'assets/HitCheck.png');                     // 範囲確認用画像
    this.load.image('ScoreBoard', 'assets/ScoreBoard.png');                 // 範囲確認用画像
    this.load.image('GameClear', 'assets/GameClear.png');                   // ゲームクリア用画像
    this.load.image('Sickle', 'assets/sickle.png');                         // 鎌
    this.load.image('OptionTitleScene', 'assets/OptionTitleScene.png');     // オプションタイトル
    this.load.image('Favicon', 'assets/Favicon.png');                       // オプションタイトル

    // スプライトシートの読み込み
    this.load.spritesheet('catEnemy', 'assets/catEnemy.png', { frameWidth: 960 / 3, frameHeight: 300 });  // 敵のスプレットシート
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 960 / 3, frameHeight: 1280 / 4 });   // プレイヤーのスプレットシート
    this.load.spritesheet('smoke', 'assets/smoke.png', { frameWidth: 256 / 2, frameHeight: 626 / 5 });      // 煙のスプレットシート
    this.load.spritesheet('background', 'assets/BG.png', { frameWidth: 16000 / 20, frameHeight: 600 });      // 背景
    this.load.spritesheet('GhostSprite', 'assets/GhostSprite.png', { frameWidth: 363 / 3, frameHeight: 313 / 2 });      // 敵（幽霊
    this.load.spritesheet('WitchSprite', 'assets/WitchSprite.png', { frameWidth: 549 / 3, frameHeight: 328 / 2 });      // 敵（魔女）
    this.load.spritesheet('GrimReaperSprite', 'assets/GrimReaperSprite.png', { frameWidth: 549 / 3, frameHeight: 330 / 2 }); // 敵（死神）
    this.load.spritesheet('Warp', 'assets/Warp.png', { frameWidth: 1200 / 10, frameHeight: 120 }); // ワープ
    this.load.spritesheet('Specter', 'assets/Specter.png', { frameWidth: 6600 / 11, frameHeight: 2000/2 }); // ボス
    this.load.spritesheet('Numbers', 'assets/Numbers.png', { frameWidth: 557 / 5, frameHeight: 224/2 }); // 数字スプライト
    this.load.spritesheet('DamageFrame', 'assets/DamageFrame.png', { frameWidth: 301, frameHeight: 196 }); // 数字スプライト
    this.load.spritesheet('Boss2', 'assets/Boss2.png', { frameWidth: 283, frameHeight: 559 }); // ジョニー
    this.load.spritesheet('Yami', 'assets/Yami.png', { frameWidth: 2400/5, frameHeight: 1400/3 }); // ジョニー

    const scene = this;
    // ロード中のテキスト
    preloadText = scene.add.text(scene.cameras.main.centerX, scene.cameras.main.centerY, 'Loading...',
        {
            font: '24px Arial'  // フォントの種類
            , fill: '#ffffff'   // 色の設定
        }).setOrigin(0.5, -1);

    // 進行状況を更新する
    this.load.on('filecomplete', function () {
        assetsLoaded++;
        const progress = Math.min(assetsLoaded / totalAssets, 1);
        const loaderSpan1 = document.querySelector('.loader span:nth-child(1)');
        const loaderSpan2 = document.querySelector('.loader span:nth-child(2)');
        const loaderSpan3 = document.querySelector('.loader span:nth-child(3)');


        //進捗度によって色のゲージを進める。
        loaderSpan1.style.borderImageSource = `linear-gradient(to right, rgb(255 255 0) ${progress * 100}%, rgb(0 255 0) ${progress * 100}%)`;
        loaderSpan2.style.borderImageSource = `linear-gradient(to right, rgb(255 0 255) ${progress * 100}%, rgb(0 0 255) ${progress * 100}%)`;
        loaderSpan3.style.borderImageSource = `linear-gradient(to right, rgb(0 255 255) ${progress * 100}%, rgb(255 0 0) ${progress * 100}%)`;

        preloadText.setText(Math.round(progress * 100) + '%');

        if (progress === 1) {
            preloadText.setText('Load complete!');

        }

    });


}
