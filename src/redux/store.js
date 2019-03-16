import {createStore} from 'redux';

import reducer from './reducer';

export const store = createStore(
  reducer, 
  // redux开发工具插件开启
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
