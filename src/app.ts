import renderingSystem from './renderingSystem'
import { MODELS } from './define'
import { load } from './meshLoader'
import spiralSystem from './spiralSystem'
console.log('app.ts loaded')

Promise.all(MODELS.map((v) => load(v))).then(() => {
  spiralSystem.init()
  const loop = () => {
    spiralSystem.exec()
    renderingSystem.exec()
    requestAnimationFrame(loop)
  }
  loop()
})
