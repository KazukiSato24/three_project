import { Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//glbファイルを読み込む
const gltfLoader = new GLTFLoader

//読み込んだモデルを入れるオブジェクトを作成
export const loaderMeshes = {} as { [key: string]: Group }

//
export const load = async (file: string) => {
  const gltf = await gltfLoader.loadAsync(`/mesh/${file}`)
  loaderMeshes[file] = gltf.scene
  
}
