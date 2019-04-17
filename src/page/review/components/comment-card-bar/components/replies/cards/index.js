import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import {MDBAvatar, MDBRow} from 'mdbreact';
import ReplyContent from './content';
import ReplyFooter from './footer';
import {urlPrefix, generateHeaders} from '../../../../../../../tool/api-helper';
import {timeHelper} from '../../../../../../../tool/time-helper';

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
    const data = {
      id:Number(window.localStorage.id)
    };
    if (evaluateStatus === 1) {
      evaluateStatus = 3;
      upvoteCount = upvoteCount === null ? 0 : --upvoteCount;
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
    } else {
      evaluateStatus = 1;
      upvoteCount = upvoteCount === null ? 1 : ++upvoteCount;
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
                upvoteCount={backend.upvoteCount}
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
