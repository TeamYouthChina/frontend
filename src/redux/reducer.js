import {initialState} from './initial-state';
import * as actionJs from './action';

import { combineReducers } from 'redux';

import { reducer as answerReducer } from '../page/playground/general-component/answer-card-bar-auth/store';
import { reducer as commentReducer } from '../page/playground/general-component/comment-card-bar/store';

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionJs.type.bodyClientWidth:
      return Object.assign({}, state, {
        bodyClientWidth: action.value
      });
    default:
      return {
        ...state
      };
  }
};


// 多个reducer放在一起
export default combineReducers({
  initial:initialReducer,
  answer:answerReducer,
  comment:commentReducer
});
