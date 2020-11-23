import { sum } from '@/utils/computed.js'
import axios from 'axios'
console.log(axios)
console.log(sum(1, 1))
if (module.hot) {
  module.hot.accept()
}

