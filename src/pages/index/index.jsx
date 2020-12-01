import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// const App = React.createElement('div', {
//   className: 'test'
// }, 'helloworld')
class App extends Component {
  render() {
    return (<div>sdf</div>)
  }
}
ReactDOM.render(<App />, document.getElementById('root'))



if (module.hot) {
  module.hot.accept()
}
