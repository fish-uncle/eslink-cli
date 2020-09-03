// import Vue from 'vue';
// import App from './vue';
// Vue.config.productionTip = false;
// new Vue({
//   render: h => h(App)
// }).$mount('#root');

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {AppContainer} from 'react-hot-loader';
import Root from './react';
import 'react-hot-loader/patch';

const render = Component => ReactDOM.render(
  <AppContainer>
    <Component/>
  </AppContainer>, document.getElementById('root')
);
render(Root);
if (module.hot) {
  module.hot.accept('./react', () => {
    render(Root);
  })
}
registerServiceWorker();