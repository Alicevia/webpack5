import React from 'react'
import ReactDOM from 'react-dom'

const App = <div>sdf</div>
// const App = React.createElement('div', {
//   className: 'test'
// }, 'helloworld')

ReactDOM.render(App, document.getElementById('root'))




if (module.hot) {
  module.hot.accept()
}
