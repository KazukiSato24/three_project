//螺旋が何回転するか
export const SPIRAL_LOOP = 8
//螺旋1週ごとに幾つのアイテムを配置するか
export const SPIRAL_SPLIT = 8
//アイテム1つごとに高さをどれだ毛変化させるか
export const SPIRAL_OFFSET_Y = 0.1
//アイテム1つごとにどれだけ、角度が変化するか
export const SPIRAL_OFFSET_ANGLE_RAD = (Math.PI * 2) / SPIRAL_SPLIT

//螺旋上のアイテムの数
export const NUM_TOTAL_ITEM = SPIRAL_SPLIT * SPIRAL_LOOP
//画像のアスペクト比
export const PLANE_ASPECT = 16 / 9
//モデルデータ一覧
export const MODELS = ['dog.glb', 'rabit.glb', 'rion.glb']

export const ITEMS = Array(NUM_TOTAL_ITEM)
  .fill(0)
  .map((v, i) => {
    if (i < 3) {
      return { title: `DummyTitle${i}`, model: MODELS[i] }
    }

    const j = i.toString().padStart(2, '2')
    return {
      title: `DummyTitle${i}`,
      texture: `dummy${j}.svg`,
      youtubeId: 'BFNekjEgvuk',
    }
  })
