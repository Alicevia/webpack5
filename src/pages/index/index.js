import { sum } from '@/utils/computed.js'
import axios from 'axios'
console.log(axios)
console.log(sum(1, 1))

let root = document.getElementById('root')
root.addEventListener('click', () => {
  import(/* webpackChunkName: "temp" */  /* webpackPrefetch: true */ '../../utils/temp.js').then(res => {
    console.log(res)
  })
})
// /* webpackPrefetch: true */ src
if (module.hot) {
  module.hot.accept()
}
