const defaultState = {
  testValue:'123'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_TEST_VALUE':
      return {...state, testValue: action.testValue};
    default:
      return state;
  }
};