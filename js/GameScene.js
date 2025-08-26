//GameScene
// ゲーム共有
change_scene="TitleScene"
// ---------プレイヤーのステータス---------
let playerSpeed = 300;             // プレイヤーの速度
let playerMoveL = -playerSpeed;    // プレイヤーの左の速度 
let playerMoveR = playerSpeed;     // プレイヤーの右の速度
const playerJumpPower = -900;      // プレイヤーのジャンプ力
const player_gravity = 1000        // 重力の強さ
let player_Max_HP = 500;           // プレイヤーのHP
let playerHP = 500;                 // プレイヤーのHP
let player_AP=1;                   // プレイヤーの攻撃力
let player_direction = false;      // ライトの向き
let loadight_angleH = 65;          // ライトの幅
let loadight_angleL = 120;         // ライトの幅
let cool_time_input = 0;           // ライトの左右振り向き速度
var damage_cool_time = 500;        // 次ダメージ受ける間隔
const lightY = 15;                 // ライトの高さを調整
const minDistance = 100;           // プレイヤーからの最小距離
let reset_check=false;
// ---------スコア管理---------
let score_candy = 0;               // 飴の得点
const bonus_candy = 1;             // 飴は1点
let score_stick = 0;               // スティック飴の得点
const bonus_stick = 5;             // スティック飴は5点
let score_Lcandy = 0;              // ペロペロキャンディー
const bonus_Lcandy = 10;           // ペロペロキャンディー10点
let score_sweet = 0;               // お菓子の詰め合わせ
const bonus_sweet = 1              // 特別のお菓子は得点とは別の扱いとする
let total_score = 0;
let score_text_candy;              // 得点を表示するテキスト
let score_text_stick;              // 得点を表示するテキスト
let score_text_Lcandy;             // 得点を表示するテキスト
let score_text_sweet;              // 得点を表示するテキスト
let HP_text;                       // HP
const drop_rate_min = 1;           // アイテムドロップ率
const drop_rate_max = 100;         // アイテムドロップ率
// ---------敵ーのステータス---------
const enemy_name = "";             // 敵の名前
let enemySpeed = 0;                // 移動速度
let enemyHP = 0;                   // 体力
let MaxHP = 0;                     // 体力
let enemyAP = 0;                   // 攻撃力
let enemyCoordinateX = 0;          // 初期位置
let enemyCoordinateY = 0;          // 初期位置
let blink_time=1000;
let attack_interval=1000;
let sickle_rotation=0;
let enemy_damage_cool_time =50;   //ダメージのクールタイム
var yamiScale = 0.1; // 初期スケール
var maxScale = 0.7; // 上限スケール
// ---------ステージ---------


class GameScene extends Phaser.Scene {
  constructor() { super({ key: 'GameScene' }); }

  // ゲームの初期化処理を行います
  preload() {
    game_preload.call(this);
  }
  // 初期化
  create() {
    game_create.call(this);
  }
  // 更新処理
  update() {
    game_update.call(this);
  }
};
