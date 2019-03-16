const defaultState = {
  backend: null,
  isCollapsed: true,
  showBottom: true,
  showComments: false,
  commentsText: null,
  pageConfig: {
    totalPage: 14 //总页码
  },
  stickyRow: {background: '#FFFFFF'},
  basicFont: {
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  },
  ulBasicNoLine: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px'
  },
  liBasicNoLine: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px'
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'INITIAL_DATA':
      return {...state, backend: action.answerData};
    case 'CHANGE_BOTTOM_STYLE':
      return {...state, stickyRow: action.stickyRow, isCollapsed:action.isCollapsed};
    case 'DEAL_SCROLL':
      return {...state, showBottom: action.showBottom};
    case 'IF_SHOW_COMMENTS':
      return {...state, commentsText: action.commentsText};
    default:
      return state;
  }
};
