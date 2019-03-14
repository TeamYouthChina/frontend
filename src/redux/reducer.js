import {initialState} from './initial-state';
import * as actionJs from './action';

export default (state = initialState, action) => {
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
