// Drawing spec, ';'-separated, coordinates in a 0–100 box:
//  f pts   coloured side of the paper     b pts   white side
//  v a b   valley fold (dashed)           m a b   mountain fold (dash-dot)
//  a a b   fold arrow                     t       "turn over" mark
export interface Step { ja: string; en: string; d: string }
export interface Model { id: string; ja: string; en: string; level: 1 | 2 | 3; steps: Step[] }

const SQ = '10,10 90,10 90,90 10,90'
const DI = '50,5 95,50 50,95 5,50'

export const MODELS: Model[] = [
  {
    id: 'plane', ja: 'かみひこうき', en: 'Paper plane', level: 1, steps: [
      { ja: '白い面を上にして、たて半分に折り目をつけて開く。', en: 'White side up. Fold in half lengthwise, then open.', d: `b ${SQ};v 50,10 50,90;a 85,50 55,50` },
      { ja: '上の2つの角を、まん中の線に合わせて折る。', en: 'Fold the two top corners to the centre line.', d: `b ${SQ};v 50,10 10,50;v 50,10 90,50;a 15,15 35,35;a 85,15 65,35` },
      { ja: 'もう一度、ななめのふちをまん中に合わせて折る。', en: 'Fold the slanted edges to the centre again.', d: `b 10,50 50,10 90,50 90,90 10,90;f 10,50 50,10 50,60;f 90,50 50,10 50,60;v 50,10 30,90;v 50,10 70,90;a 15,60 40,60;a 85,60 60,60` },
      { ja: 'うらがえして、まん中で半分に山折りする。', en: 'Turn over and fold in half along the centre (mountain fold).', d: `f 50,10 30,90 70,90;m 50,10 50,90;t` },
      { ja: 'つばさを左右とも下のふちに合わせて折りおろす。', en: 'Fold each wing down to the bottom edge.', d: `f 50,10 50,90 30,90;f 50,10 50,90 60,90;v 50,10 40,90;a 30,40 45,70` },
      { ja: 'つばさを広げたら完成！そっと飛ばそう。', en: 'Open the wings and you are done! Throw it gently.', d: `f 50,8 15,80 50,70;f 50,8 85,80 50,70;b 50,8 46,92 54,92` },
    ],
  },
  {
    id: 'cup', ja: 'コップ', en: 'Cup', level: 1, steps: [
      { ja: '色の面を下にして、ひし形におく。下の角を上の角に合わせて三角に折る。', en: 'Colour side down, as a diamond. Fold the bottom corner up to the top.', d: `b ${DI};v 5,50 95,50;a 50,90 50,12` },
      { ja: '右の角を、左のふちに合わせて折る。', en: 'Fold the right corner across to the left edge.', d: `f 5,50 95,50 50,5;v 72,27 30,50;a 90,48 22,35` },
      { ja: '左の角も同じように右へ折る。', en: 'Fold the left corner across to the right the same way.', d: `f 5,50 95,50 50,5;b 72,27 30,50 20,35;v 28,27 70,50;a 10,48 80,35` },
      { ja: '上の三角を手前に1枚だけ折りさげる。', en: 'Fold one layer of the top triangle down towards you.', d: `f 28,27 72,27 70,50 30,50;b 28,27 72,27 50,5;v 28,27 72,27;a 50,10 50,40` },
      { ja: 'うらがえして、のこりの三角も折りさげる。', en: 'Turn over and fold the other triangle down.', d: `f 28,27 72,27 70,50 30,50;f 28,27 72,27 50,5;v 28,27 72,27;t` },
      { ja: '口を開いたらコップの完成！', en: 'Open the top and your cup is ready!', d: `f 22,25 78,25 66,88 34,88;b 22,25 78,25 70,32 30,32` },
    ],
  },
  {
    id: 'kabuto', ja: 'かぶと', en: 'Samurai helmet', level: 1, steps: [
      { ja: '色の面を下にして、上の角を下に合わせて三角に折る。', en: 'Colour side down. Fold the top corner down to make a triangle.', d: `b ${DI};v 5,50 95,50;a 50,10 50,88` },
      { ja: '左右の角を、下の角に合わせて折る。', en: 'Fold the left and right corners down to the bottom corner.', d: `f 5,20 95,20 50,65;v 50,20 50,65;a 10,25 45,60;a 90,25 55,60` },
      { ja: '下の2つの角を上の角へ折りあげる。', en: 'Fold the two bottom points up to the top.', d: `f 5,20 50,20 50,65;f 95,20 50,20 50,65;v 27,42 50,42;v 50,42 73,42;a 48,62 40,25;a 52,62 60,25` },
      { ja: 'その角を、外がわへななめに折りかえす（つの）。', en: 'Fold those points outward at an angle to make the horns.', d: `f 5,20 95,20 50,65;b 27,42 50,20 50,42;b 73,42 50,20 50,42;v 40,30 50,42;a 45,25 30,15;a 55,25 70,15` },
      { ja: '下の三角を、1枚だけ上に2回折りあげる。', en: 'Fold the front bottom layer up twice.', d: `f 5,20 95,20 50,75;b 20,20 35,5 50,20;b 80,20 65,5 50,20;v 25,45 75,45;a 50,72 50,50` },
      { ja: 'のこりを内がわに折りこんだら完成！', en: 'Tuck the back layer inside and it is done!', d: `f 10,40 90,40 80,70 20,70;f 20,40 30,10 45,40;f 80,40 70,10 55,40;b 10,40 90,40 85,50 15,50` },
    ],
  },
  {
    id: 'boat', ja: 'ふね', en: 'Paper boat', level: 2, steps: [
      { ja: '長方形の紙（または正方形）を、上から下へ半分に折る。', en: 'Fold the paper in half from top to bottom.', d: `b ${SQ};v 10,50 90,50;a 50,15 50,80` },
      { ja: '上の2つの角を、まん中に向かって三角に折る。', en: 'Fold the two top corners down to the middle.', d: `f 10,30 90,30 90,80 10,80;v 50,30 30,60;v 50,30 70,60;a 15,35 40,55;a 85,35 60,55` },
      { ja: '下のふちを、前と後ろそれぞれ上に折りあげる。', en: 'Fold the bottom strip up, front and back.', d: `f 10,60 50,20 90,60 90,80 10,80;v 10,62 90,62;a 50,78 50,55` },
      { ja: '下を開いて、ひし形になるようにたたむ。', en: 'Open from the bottom and flatten into a diamond.', d: `f ${DI};v 5,50 95,50;a 20,80 40,55;a 80,80 60,55` },
      { ja: '下の角を前と後ろ、上へ折りあげて三角にし、もう一度ひし形にたたむ。', en: 'Fold the bottom corners up, then open and flatten into a diamond again.', d: `f ${DI};v 20,50 80,50;a 50,90 50,55` },
      { ja: '上の角を左右に引っぱって開いたら完成！', en: 'Pull the top corners apart and the boat is done!', d: `f 5,50 95,50 75,80 25,80;f 40,50 50,10 60,50;b 30,50 50,25 70,50` },
    ],
  },
  {
    id: 'dog', ja: 'いぬの顔', en: 'Dog face', level: 1, steps: [
      { ja: '色の面を下にして、上の角を下に合わせて三角に折る。', en: 'Colour side down. Fold the top corner down to make a triangle.', d: `b ${DI};v 5,50 95,50;a 50,10 50,88` },
      { ja: '左右の角を、ななめ下に折って耳をつくる。', en: 'Fold the left and right corners down at an angle for the ears.', d: `f 5,20 95,20 50,65;v 30,20 22,55;v 70,20 78,55;a 10,25 18,55;a 90,25 82,55` },
      { ja: '下の角を少しだけ上に折る（はな）。', en: 'Fold the bottom tip up a little for the nose.', d: `f 30,20 70,20 50,65;f 30,20 14,55 24,55;f 70,20 86,55 76,55;v 42,55 58,55;a 50,64 50,50` },
      { ja: 'ペンで目とはなをかいたら完成！', en: 'Draw the eyes and nose and it is done!', d: `f 30,20 70,20 50,62;f 30,20 14,58 26,52;f 70,20 86,58 74,52;b 44,54 56,54 50,62` },
    ],
  },
  {
    id: 'cat', ja: 'ねこの顔', en: 'Cat face', level: 1, steps: [
      { ja: '色の面を下にして、下の角を上に合わせて三角に折る。', en: 'Colour side down. Fold the bottom corner up to make a triangle.', d: `b ${DI};v 5,50 95,50;a 50,90 50,12` },
      { ja: 'たて半分に折り目をつけて開く。', en: 'Make a crease down the middle, then open.', d: `f 5,80 95,80 50,35;v 50,35 50,80` },
      { ja: '左右の角を、上に向けてななめに折りあげる（耳）。', en: 'Fold the left and right corners up at an angle for the ears.', d: `f 5,80 95,80 50,35;v 35,80 45,45;v 65,80 55,45;a 10,78 30,30;a 90,78 70,30` },
      { ja: '上の角を下に折る。', en: 'Fold the top corner down.', d: `f 35,80 65,80 50,40;f 35,80 25,25 45,45;f 65,80 75,25 55,45;v 40,55 60,55;a 50,42 50,62` },
      { ja: 'うらがえして顔をかいたら完成！', en: 'Turn over, draw a face and it is done!', d: `f 25,40 75,40 65,80 35,80;f 25,40 25,15 40,40;f 75,40 75,15 60,40;t` },
    ],
  },
  {
    id: 'tulip', ja: 'チューリップ', en: 'Tulip', level: 1, steps: [
      { ja: '色の面を下にして、下の角を上に合わせて三角に折る。', en: 'Colour side down. Fold the bottom corner up to make a triangle.', d: `b ${DI};v 5,50 95,50;a 50,90 50,12` },
      { ja: 'たて半分に折り目をつけて開く。', en: 'Crease down the middle and open.', d: `f 5,50 95,50 50,5;v 50,5 50,50` },
      { ja: '右の角を、まん中より少し外がわに向けて斜め上に折る。', en: 'Fold the right corner up so it sticks out past the top.', d: `f 5,50 95,50 50,5;v 50,50 72,27;a 92,48 70,8` },
      { ja: '左の角も同じように折る。', en: 'Fold the left corner the same way.', d: `f 5,50 50,50 50,5;f 50,50 70,5 72,27;v 50,50 28,27;a 8,48 30,8` },
      { ja: 'うらがえして、左右の角を少し折ったら花の完成！', en: 'Turn over, fold in the side corners a little and the flower is done!', d: `f 30,55 70,55 50,80;f 30,55 30,15 50,40;f 70,55 70,15 50,40;f 50,40 40,20 60,20;t` },
    ],
  },
  {
    id: 'heart', ja: 'ハート', en: 'Heart', level: 2, steps: [
      { ja: '色の面を下にして、たて・よこに半分の折り目をつける。', en: 'Colour side down. Crease in half both ways, then open.', d: `b ${SQ};v 50,10 50,90;v 10,50 90,50` },
      { ja: '上のふちを、まん中の線に合わせて折りさげる。', en: 'Fold the top edge down to the centre line.', d: `b ${SQ};v 10,30 90,30;a 50,12 50,48` },
      { ja: '下のふちを、上のふちに合わせて折りあげる。', en: 'Fold the bottom edge up to the top edge.', d: `b 10,30 90,30 90,90 10,90;f 10,30 90,30 90,50 10,50;v 10,60 90,60;a 50,88 50,35` },
      { ja: 'うらがえして、左右の下半分をまん中で上に折りあげる。', en: 'Turn over. Fold each bottom half up along the centre.', d: `f 10,30 90,30 90,60 10,60;v 50,60 30,30;v 50,60 70,30;a 15,58 45,25;a 85,58 55,25;t` },
      { ja: '上の角を4つ、うしろに小さく折ったら完成！', en: 'Fold the four top corners back a little and it is done!', d: `f 50,85 15,50 20,25 40,25 50,40;f 50,85 85,50 80,25 60,25 50,40` },
    ],
  },
  {
    id: 'frog', ja: 'ぴょんぴょんがえる', en: 'Jumping frog', level: 2, steps: [
      { ja: '紙をたて半分に切って長方形にする。上のはしにバツの折り目をつける。', en: 'Cut the paper in half to a rectangle. Crease an X at the top.', d: `b 30,5 70,5 70,95 30,95;v 30,5 70,45;v 70,5 30,45;v 30,25 70,25` },
      { ja: '折り目にそってたたみ、上に三角をつくる。', en: 'Collapse along the creases to make a triangle at the top.', d: `f 30,25 70,25 50,5;b 30,25 70,25 70,95 30,95;a 30,20 45,15;a 70,20 55,15` },
      { ja: '三角の左右の角を、上の角に向けて折りあげる（前あし）。', en: 'Fold the triangle corners up to its top point (front legs).', d: `b 30,25 70,25 70,95 30,95;f 30,25 70,25 50,5;v 40,15 50,25;v 60,15 50,25;a 32,24 45,8;a 68,24 55,8` },
      { ja: '左右のふちをまん中に合わせて折る。', en: 'Fold the long sides in to the centre.', d: `b 40,25 60,25 60,95 40,95;f 30,25 70,25 50,5;v 40,25 40,95;v 60,25 60,95;a 32,60 45,60;a 68,60 55,60` },
      { ja: '下を半分上に折りあげ、その半分を下に折りかえす（ばね）。', en: 'Fold the bottom up halfway, then fold it back down (the spring).', d: `b 40,25 60,25 60,60 40,60;f 30,25 70,25 50,5;v 40,60 60,60;v 40,45 60,45;a 50,90 50,50` },
      { ja: 'おしりを指でおして放すと、ぴょんと跳ぶ！', en: 'Press its back and let go — it jumps!', d: `f 25,60 75,60 65,30 35,30;f 25,60 15,75 35,62;f 75,60 85,75 65,62;b 40,30 60,30 50,20` },
    ],
  },
  {
    id: 'crane', ja: 'つる', en: 'Crane', level: 3, steps: [
      { ja: '色の面を上にして、三角に2回折り目をつける。うらがえして四角に2回折り目をつける。', en: 'Colour up, crease both diagonals. Turn over, crease in half both ways.', d: `f ${SQ};v 10,10 90,90;v 90,10 10,90;m 50,10 50,90;m 10,50 90,50` },
      { ja: '折り目にそってたたみ、小さな正方形（正方基本形）にする。', en: 'Collapse along the creases into a small square (square base).', d: `f ${DI};v 50,5 50,95;a 15,60 40,60;a 85,60 60,60` },
      { ja: '開いている方を下にして、左右のふちをまん中に合わせて折り、上の三角を折りさげて折り目をつけて戻す。', en: 'Open end down: fold the lower edges to the centre and the top down, crease, then unfold.', d: `f ${DI};v 5,50 50,95;v 95,50 50,95;v 27,72 73,72;v 27,72 50,50;v 73,72 50,50` },
      { ja: '下の1枚を持ち上げて、折り目にそって細長くたたむ（花弁折り）。うらも同じ。', en: 'Lift the bottom layer up along the creases into a long diamond (petal fold). Repeat on the back.', d: `f 50,5 70,50 50,95 30,50;a 50,90 50,15` },
      { ja: '下の2本の足を、まん中に合わせて細く折る。うらも同じ。', en: 'Narrow both lower legs to the centre. Repeat on the back.', d: `f 50,5 70,50 50,95 30,50;v 50,50 50,95;a 32,60 47,65;a 68,60 53,65` },
      { ja: '細い足を、内がわに折りあげて首としっぽにする（中わり折り）。', en: 'Inside-reverse fold the thin legs up to make the neck and tail.', d: `f 50,40 60,55 50,95 40,55;f 45,60 15,20 20,18 48,55;f 55,60 85,20 80,18 52,55;a 40,80 20,25;a 60,80 80,25` },
      { ja: '首の先を折って頭にし、羽を広げたら完成！', en: 'Reverse fold a head, spread the wings and you are done!', d: `f 15,25 10,30 20,28;f 20,28 45,62 50,55;f 85,25 80,28 55,62 50,55;f 50,55 30,10 70,10;f 50,55 25,70 75,70` },
    ],
  },
]
