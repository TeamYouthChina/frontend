// import { getAsync } from '../../../../../tool/api-helper';
import data from '../index.data';


export const changeAnswerData = () => {
  return {
    type: 'INITIAL_DATA',
    answerData:data.content
  };
};
//todo,现在不支持异步的方法
export const getAnswerData = () => {
  return async (dispatch) => {
    try{
      // const result = await getAsync(`/questions/${id}`);
      const result = data;
      dispatch(changeAnswerData(result.content));
    } catch (e) {
      // console.log(e);
    }
  };
}; 

export const changeBottomStyle = (isCollapsed) => {
  if(isCollapsed) {
    return {
      type:'CHANGE_BOTTOM_STYLE',
      stickyRow: {
        background: '#FFFFFF',
        position: 'sticky',
        bottom: '0px'
      },
      isCollapsed: false
    };
  } else {
    return {
      type:'CHANGE_BOTTOM_STYLE',
      isCollapsed: true,
      stickyRow: {
        background: '#FFFFFF',
        
      }
    };
  }
};

export const showComments = (commentsText, counts) => {
  let commentsTextNow = commentsText === `${counts}条评论` ? '收起评论' : `${counts}条评论`;
  let showComments = commentsText === `${counts}条评论`;
  return {
    type:'IF_SHOW_COMMENTS',
    commentsText:commentsTextNow,
    showComments
  };
};
