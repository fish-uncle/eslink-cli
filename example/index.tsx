import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Root from "./test"
import 'react-hot-loader/patch'

import registerServiceWorker from './sw'
registerServiceWorker()
const render = Component => ReactDOM.render(
  <AppContainer>
    <Component/>
  </AppContainer>, document.getElementById('root')
)
render(Root)
registerServiceWorker()