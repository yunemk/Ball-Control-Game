# Ball Control Game

## 概要
ボールをプログラミングの感覚で動かして遊ぶゲームです。

[Webページ ![](img/gameDisplay.png)](https://yunemk.github.io/Ball-Control-Game/)

## 遊び方
* 左の動作一覧から動きを選択します。
* 真ん中のリストに動作を並べたら実行をクリックします。
* ボールが指定した通りに動きます。

## 注意点
* IE では動きません。

---
## コンセプト

>for 文を使ったアルゴリズム、アルゴリズムと数学の関係性、アルゴリズムと英字文章の関係性、チームワーク（コミュニケーション能力）の考え方を身につけてもらう

ことが形式的な目標です。

---
## セットアップ
モジュールのインストール

`npm ci`

アプリの起動

`electron main`

ビルド

`electron-builder [options]`

## ステージの情報
ステージ情報は *src/js/stage.js* に記載しています。
```js
"stage-{number}": {
  "field": {
    "column": "列(1以上): number",
    "row": "行(1以上): number",
    "status": ["..."]
  },
  "alphabets": {
    "question": "お題: string",
    "ans": "答え: string",
    "pos": [{
        "char": "alphabet: string",
        "x": "alphabetのX座標: number",
        "y": "alphabetのY座標: number"
      },
      {
        "...": "..."
      }
    ]
  },
  "arithmetic": {
    "subject": "お題: string",
    "ans": "答え: number",
    "pos": [{
        "char": "数もしくは演算子: string",
        "x": "charのX座標: number",
        "y": "charのY座標: number"
      },
      {
        "...": "..."
      }
    ]
  },
  "ball": {
    "initPosX": "初期位置のX座標: number",
    "initPosY": "初期位置のY座標: number",
    "color": "ボールの色: string",
    "strokeColor": "輪郭の色: string"
  },
  "canvas": {
    "background": "画面の背景色: string"
  },
  "actionsBadgeNum": {
    "dir": {
      "up": ["上へ1マスの回数: number", "2マス", "3マス"],
      "right": ["右へ1マスの回数: number", "2マス", "3マス"],
      "down": ["下へ1マスの回数: number", "2マス", "3マス"],
      "left": ["左へ1マスの回数: number", "2マス", "3マス"]
    },
    "loop": {
      "start": ["繰り返し2回の回数: number", "3回", "4回"],
      "end": "繰り返し終わりの回数: number"
    }
  }
}
```
status: {column}x{row}の2次元配列
  * 0 (black): ボールが乗るとエラーが発生する
  * 1 (white): デフォルトのブロック
  * 2 (magenta): ボールが止まるとクリア
  * 3 (gold): ボールが乗ると olive ブロックにワープする (olive ブロックが必要, 1つだけ設定)
  * 4 (olive): gold ブロックに乗ったボールがワープして来る場所 (gold ブロックが必要, 1つだけ設定)

alphabets, arithmetic
- フィールドにある文字や数字、演算子をお題の通りに集めるという、クリアのための条件が追加される。

alphabetsとarithmeticの注意点
* 任意の機能。
* 色ブロックの上には配置したり、重ねて配置しない。 (乗っていても効果がない。複数のイベントが発生する。)
* お題と答えは誤解のないように設定する。
* arithmeticは数字か以下の演算子しか使えない。

  +, -, ×, ÷, (, )

#### 初期値
* field.column: 12, field.row: 12
* field.status: undefined (必須項目です)
* ball.initPosX: 1, ball.initPosY: 1
* ball.color: "cyan", ball.strokeColor: "black"
* alphabets: null
* arithmetic: null
* canvas.background: "#fff"

---

## 修正予定
* canvasの描画を変更する (ボールが動いていなくても10ms毎にcanvasを描画している)
