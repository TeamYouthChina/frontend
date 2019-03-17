const defaultState = {
  backend: null,
  isCollapsed: true,
  showComments: false,
  commentsText: '2条评论',
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
    case 'IF_SHOW_COMMENTS':
      return {...state, commentsText: action.commentsText, showComments:action.showComments};
    default:
      return state;
  }
};
