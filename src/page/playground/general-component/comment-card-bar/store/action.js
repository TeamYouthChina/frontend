// import { getAsync } from '../../../../../tool/api-helper';
import data from '../data';

export const initialCommentData = () => {
  return {
    type: 'INITIAL_COMMENT_DATA',
    commentLists:data.content
  };
};

export const showReplies = (showReplies, showCommentsText) => {
  let reply = !showReplies;
  let text = showCommentsText === '查看回复' ? '收起回复' : '查看回复';
  return {
    type:'SHOW_REPLYS',
    showReplies:reply,
    showCommentsText:text
  };
};

export const giveReplies = (showGive, replyText) => {
  let show = !showGive;
  let text = replyText === '回复' ? '取消回复' : '回复';
  return {
    type:'GIVE_REPLIES',
    showGive:show,
    replyText:text
  };
};

export const addComments = (newComment) => {
  return {
    type:'ADD_COMMENT',
    newComment:newComment
  };
};
