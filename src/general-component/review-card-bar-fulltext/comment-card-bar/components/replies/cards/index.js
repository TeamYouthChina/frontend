import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import {MDBAvatar, MDBRow} from 'mdbreact';
import ReplyContent from './content';
import ReplyFooter from './footer';
import {urlPrefix, generateHeaders} from '../../../../../../tool/api-helper';
import {timeHelper} from '../../../../../../tool/time-helper';

class ReplyCard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      backend:null
    };
  }

  componentDidMount(){
    this.setState(()=>({
      backend:{...this.props.data},
    }));
  }

  // 点赞
  onVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id:Number(window.localStorage.id)
    };
    // 取消点赞
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/vote`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    } else if(evaluateStatus === 2) {
      // 取消反对
      evaluateStatus = 1;
      upvoteCount++;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/upvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount,
          downvoteCount
        }
      }));
    } else {
      evaluateStatus = 1;
      upvoteCount++;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/upvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          upvoteCount
        }
      }));
    }
  };
  // 反对
  onDownVote = () => {
    let evaluateStatus = this.state.backend.evaluateStatus;
    let upvoteCount = this.state.backend.upvoteCount;
    let downvoteCount = this.state.backend.downvoteCount;
    const data = {
      id:Number(window.localStorage.id)
    };
    if (evaluateStatus === 2) {
      evaluateStatus = 3;
      downvoteCount--;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/vote`,
          {
            method: 'DELETE',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount
        }
      }));
    } else if(evaluateStatus === 3) {
      evaluateStatus = 2;
      downvoteCount++;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/downvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount
        }
      }));
    } else {
      evaluateStatus = 2;
      downvoteCount++;
      upvoteCount--;
      try {
        fetch(
          `${urlPrefix}/replies/${this.props.data.id}/downvote`,
          {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify(data)
          },
        );
      } catch (e) {
        alert(e);
      }
      this.setState(() => ({
        backend: {
          ...this.state.backend,
          evaluateStatus,
          downvoteCount,
          upvoteCount
        }
      }));
    }
  };
  
  render(){
    const {backend} = this.state;
    return (backend !== null) ? (
      <div className={classes.wrapper}>
        <div>
          <MDBRow className={classes.mdbRow}>
            <MDBAvatar className={classes.avatar}>
              <img
                src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                alt="avatar"
                className={`rounded-circle ${classes.imgStyle}`}
              />
            </MDBAvatar>
            <div className={classes.commentWrapper}>
              <ReplyContent
                user={backend.creator}
                time={timeHelper(backend.create_at)}
                content={backend.body}
              />
              <ReplyFooter
                onVote={this.onVote}
                onDownVote={this.onDownVote}
                upvoteCount={backend.upvoteCount}
                downvoteCount={backend.downvoteCount}
                evaluateStatus={backend.evaluateStatus}
              />
            </div>
          </MDBRow>
        </div>
      </div>
    ):(
      <div>
        loading
      </div>
    );
  }
}

ReplyCard.propTypes = {
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ReplyCard);
