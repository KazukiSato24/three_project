import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  TextureLoader,
} from 'three'
import {
  ITEMS,
  SPIRAL_OFFSET_ANGLE_RAD,
  PLANE_ASPECT,
  SPIRAL_OFFSET_Y,
} from './define'
import { loaderMeshes } from './meshLoader'
import { SPIRAL_SPLIT } from './define'

const textureLoader = new TextureLoader()

export default class SpiralItem {
  object!: Object3D
  isPlane = false
  static scene: any

  initAsModel(item: typeof ITEMS[number]) {
    this.object = loaderMeshes[item.model!].clone()
    this.object.traverse((v) => {
      const mesh = v as Mesh
      if (mesh.isMesh && !Array.isArray(mesh.material)) {
        mesh.material = mesh.material.clone()
        mesh.material.transparent = true
      }
    })

    this.object.scale.set(0.5, 0.5, 0.5)
    this.object.rotation.x = Math.PI * 2 * Math.random()
    this.object.rotation.y = Math.PI * 2 * Math.random()
    this.object.rotation.z = Math.PI * 2 * Math.random()
  }

  initAsPlane(item: typeof ITEMS[number]) {
    const geo = new PlaneGeometry(0.5, 0.3)
    const mat = new MeshBasicMaterial({
      map: textureLoader.load(`imgs/${item.texture}`),
      side: DoubleSide,
      transparent: true,
    })

    this.object = new Mesh(geo, mat)
    this.isPlane = true
  }

  adustPlaneShape() {
    //隣合う板野横幅をくっつける
    const itemRot = SPIRAL_OFFSET_ANGLE_RAD * this.i
    this.object.rotation.y = itemRot

    //板の横幅
    const halfOfPlaneWidth = Math.tan(SPIRAL_OFFSET_ANGLE_RAD / 2)

    const mesh = this.object as Mesh
    const pos = mesh.geometry.getAttribute('position')
    for (let i = 0; i < 4; i++) {
      const x = pos.getX(i)
      if (x > 0) pos.setX(i, halfOfPlaneWidth)
      if (x < 0) pos.setX(i, -halfOfPlaneWidth)
    }

    //板が正面に来た時の傾きを調整する
    const centerRot = itemRot / (Math.PI / 180)
    let rRot = centerRot + ((360 / SPIRAL_SPLIT / 2) % 360)
    let lRot = centerRot - ((360 / SPIRAL_SPLIT / 2) % 360)
    if (rRot < 0) rRot += 360
    if (lRot < 0) lRot += 360

    const halfTheta = 360 / SPIRAL_SPLIT / 2
    const halfThetaL = 360 - halfTheta
    let rAdustRate = 0

    if (0 <= rRot && rRot < halfTheta) {
      rAdustRate = lerp(0, 0, halfTheta, -1, rRot)
    } else if (halfTheta <= rRot && rRot < halfThetaL) {
      rAdustRate = lerp(halfTheta, -1, halfThetaL, 1, rRot)
    }

    const halfOfPlaneHeight = halfOfPlaneWidth / PLANE_ASPECT
    const halfOfSpiralOffsetY = SPIRAL_OFFSET_Y / 2

    pos.setY(0, -halfOfSpiralOffsetY + halfOfPlaneHeight) //左上
    pos.setY(1, halfOfSpiralOffsetY + halfOfPlaneHeight) //右上
    pos.setY(2, -halfOfSpiralOffsetY - halfOfPlaneHeight) //左下
    pos.setY(3, halfOfSpiralOffsetY - halfOfPlaneHeight) //右下
    pos.needsUpdate = true
  }
  constructor(item: typeof ITEMS[number], public i: number, parent: Object3D) {
    if (item.model) this.initAsModel(item)
    else this.initAsPlane(item)
    this.object.traverse((v) => (v.userData = { i }))
    parent.add(this.object)
  }
}

//線形補完
const lerp = (x0: number, y0: number, x1: number, y1: number, x: number) => {
  return y0 + (x - x0) + (y1 - y0) / (x1 - x0)
}
