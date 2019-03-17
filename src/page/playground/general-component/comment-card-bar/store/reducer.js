const defaultState = {
  showReplies: false,
  showGive: false,
  showCommentsText: '查看回复',
  replyText: '回复',
  commentLists: [],
  allReplies: [],
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
    case 'INITIAL_COMMENT_DATA':
      return {...state, commentLists: action.commentLists};
    case 'SHOW_REPLIES':
      return {...state, showReplies: action.showReplies, showCommentsText: action.showCommentsText};
    case 'GIVE_REPLIES':
      return {...state, showGive: action.showGive, replyText: action.replyText};
    case 'ADD_COMMENT':
      return {
        ...state, commentLists: [{
          id: new Date(),
          user: 'lalal',
          time: '123',
          content: action.newComment,
        }, ...state.commentLists]
      };
    default:
      return state;
  }
};
