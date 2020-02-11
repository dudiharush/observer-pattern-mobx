import * as mobx from './mobx'
import * as simpleMobx from './mobx-simplified'

const firstname = mobx.observable('some name')
const dispose = mobx.autorun(() => {
  console.log(firstname.get())
})

const o = simpleMobx.observable({ x: 1, y: 2 })
simpleMobx.autorun(() => {
  console.log('hey', o.x)
})
o.x = 10
o.x = 20

firstname.set('some name 1')
dispose()
firstname.set('some name 2')
firstname.set('some name 3')
console.log(firstname.get())
