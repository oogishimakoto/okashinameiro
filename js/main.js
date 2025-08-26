
var gravityPower = 300;  // カスタムの重力の強さ
let width = 800;         // ゲームウィンドウの幅
let height = 600;        // ゲームウィンドウの高さ

var player;             // プレイヤーキャラクター
var stars;              // 星のグループ
var bombs;
var cursors;            // キーボードの矢印キー
var gameOver = false;   // ゲームオーバフラグ
var startCheck = false;
var fpsText;
var restartText;        // リザルトのテキスト
var gameOverText;       // ゲームオーバーのテキスト
var bgm;
var collarnum = 100;

var config = {
    type: Phaser.AUTO,     // ゲームのレンダリング方式を自動選択します
    parent: 'arcade',
    width: width,          // ゲーム画面の幅
    height: height,        // ゲーム画面の高さ
    scene: [LordScene, GameScene, Stage1, Stage2, Stage3, Stage4, Stage5,Boss, TitleScene, ResultScene, AudioManager,GameClearScene,Boss2],// シーンのセット

    // 物理エンジンの設定
    physics: {
        default: "arcade",                  // エンジンをアーケード物理エンジンに設定します
        arcade: {
            gravity: { y: gravityPower },   // アーケード物理エンジンの重力を設定します
            debug: false                    // デバッグモードの設定
        }
    },
    scale: {
        position: 'absolute'
    },

};
// シーンタイトル処理

var game = new Phaser.Game(config);

