import React from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBBtn} from 'mdbreact';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import { AddComment } from './components/add-comment/add-comment';
import CommentCard from './components/comment-card/commentCard';
import { PaginationUse } from './components/pagination';
import classes from './index.module.css';
import Expend from '../../public/expand-more.svg';
import {generateHeaders, isLogin, urlPrefix, getAsync} from '../../../../tool/api-helper';
import {timeHelper} from '../../../../tool/time-helper';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      commentLists:null,
      showReplies: false,
      showGive: false,
      showCommentsText: '查看回复',
      replyText: '回复',
      allReplies: [],
      start:0,
      end:3,
    };
    this.text = Comments.i18n[languageHelper()];
    this.addComments = this.addComments.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.showReplies = this.showReplies.bind(this);
    this.giveReplies = this.giveReplies.bind(this);
  }

  componentDidMount() {
    if(isLogin()){
      this.fetchAgain();
    } else {
      this.props.history.push('/login');
    }
  }
  // 添加评论
  addComments(value){
    const data = {
      body: value,
      is_anonymous: false
    };
    try {
      fetch(
        `${urlPrefix}/${this.props.type}/${this.props.id}/comments`,
        {
          method:'POST',
          headers:generateHeaders(),
          body:JSON.stringify(data)
        },
      ).then((res)=>(
        res.json()
      )).then(async ()=>{
        try {
          const result = await getAsync(`/${this.props.type}/${this.props.id}/comments`);
          if(result.status.code === 2000){
            this.setState(()=>({
              commentLists:result.content.data
            }),()=>{
              this.props.onTellParent(this.state.commentLists.length);
            });
          } else {
            this.props.history.push('/page-no-found');
          }
        } catch (e) {
          alert(e);
        }
      });
    } catch (e) {
      alert(e);
    }
  }
  // 再次获取数据
  fetchAgain = async () => {
    if(isLogin()){
      try {
        const result = await getAsync(`/${this.props.type}/${this.props.id}/comments`);
        if(result.status.code === 2000){
          this.setState(()=>({
            commentLists:result.content.data
          }));
        } else {
          this.props.history.push('/page-no-found');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push('/login');
    }
  };
  // 查看回复
  showReplies(){
    let reply = !this.state.showReplies;
    let text = this.state.showCommentsText === '查看回复' ? '收起回复' : '查看回复';
    this.setState({
      showReplies:reply,
      showCommentsText:text
    });
  }
  // 添加回复
  giveReplies(){
    let show = !this.state.showGive;
    let text = this.state.replyText === '回复' ? '取消回复' : '回复';
    this.setState({
      showGive:show,
      replyText:text
    });
  }

  // 分页
  getCurrentPage(index){
    const start = 3 * (index-1);
    const end = 3 * index;
    this.setState({
      start,
      end
    });
  }

  renderComment = () =>{
    let start = this.state.start;
    let end = this.state.end;
    let array = [];
    for(let i in this.state.commentLists){
      if((i > start-1) && (i < end)){
        let item = this.state.commentLists[i];
        array.push(
          <CommentCard
            id={item.id}
            user={item.creator && item.creator.username}
            time={timeHelper(item.modified_at)}
            content={item.body}
            upvoteCount={item.upvoteCount}
            downvoteCount={item.downvoteCount}
            evaluateStatus={item.evaluateStatus}
            addComments={this.addComments}
          />
        );
      }
    }
    return array;
  };
  
  render() {
    return (this.state.commentLists !== null) ? (
      <div className={classes.wrapper}>
        <MDBRow className={classes.mdbRow}>
          {this.state.commentLists.length}条评论
        </MDBRow>
        <AddComment 
          addComments={this.addComments}
        />
        {this.renderComment()}
        {this.state.commentLists.length !== 0 ? (
          <MDBRow center className={classes.pagination}>
            <PaginationUse
              pageConfig={{totalPage: Math.ceil(this.state.commentLists.length / 3)}}
              pageCallbackFn={this.getCurrentPage}
            />
          </MDBRow>
        ) : null}
        <MDBRow center className={classes.mdbRow2}>
          <MDBBtn className={classes.btnStyle} onClick={this.props.showComments} flat>
            收起评论<img src={Expend} className={classes.iconStyle} alt='up' />
          </MDBBtn>
        </MDBRow>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

Comments.propTypes = {
  // 评论text
  commentsText: PropTypes.string.isRequired,
  onTellParent: PropTypes.func.isRequired,
  history: PropTypes.object,
  id: PropTypes.number,
  type: PropTypes.string,
  // 收起评论
  showComments: PropTypes.func.isRequired,
  
};

Comments.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default withRouter(Comments);
