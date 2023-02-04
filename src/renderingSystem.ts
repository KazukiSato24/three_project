import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  GridHelper,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
class RenderingSystem {
  canvas = document.createElement('canvas')
  renderer = new WebGLRenderer({
    canvas: this.canvas,
    //画像を綺麗に表示するため
    antialias: true,
    //透過の有無
    alpha: true,
  })

  //視野角、通常60〜70、今回はモデルを扱うため、小さめ
  fov = 25

  //カメラ
  camera = new PerspectiveCamera(this.fov)

  controls = new OrbitControls(this.camera, this.canvas)

  scene = new Scene()

  constructor() {
    const width = window.innerWidth
    const height = window.innerHeight
    //canvasのサイズ
    this.renderer.setSize(width, height)
    this.renderer.setClearColor(0x33333)
    this.renderer.setPixelRatio(devicePixelRatio)

    this.camera.aspect = width / height
    //斜め上
    this.camera.position.set(20, 20, 20)
    this.camera.lookAt(0, 0, 0)
    this.camera.updateProjectionMatrix()

    const grid = new GridHelper(100, 100)
    this.scene.add(grid)

    // const BoxGeo = new BoxGeometry
    // const BoxMat = new MeshStandardMaterial({
    //   color: 0x000000ff,
    //   transparent: true,
    //   opacity: .3,
    // })
    // const Box = new Mesh(BoxGeo, BoxMat)
    // this.scene.add(Box)

    const directionalLight = new DirectionalLight(0xfffffff)
    directionalLight.position.set(10, 20, 30)
    directionalLight.lookAt(0, 0, 0)
    this.scene.add(directionalLight)

    //canvasを追加する
    document.body.append(this.canvas)
  }

  exec() {
    //描画とカメラの更新
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
const renderingSystem = new RenderingSystem()
export default renderingSystem
