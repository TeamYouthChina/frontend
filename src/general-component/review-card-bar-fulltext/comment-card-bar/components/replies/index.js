import React from 'react';
import PropTypes from 'prop-types';
import {urlPrefix, generateHeaders, isLogin} from '../../../../../tool/api-helper';
import {withRouter} from 'react-router-dom';
import ReplyCard from './cards';
import {AddReply} from './cards/addReply';

class Reply extends React.Component{
  constructor(props){
    super(props);
    this.state={
      backend:null
    };
  }
  
  componentDidMount(){
    this.fetchNow();
  }
  
  fetchNow = () => {
    if(isLogin()){
      try{
        fetch(
          `${urlPrefix}/comments/${this.props.commentId}/replies`,
          {
            method:'GET',
            headers:generateHeaders(),
            body:null
          }
        ).then((res)=>(
          res.json()
        )).then((res)=>{
          if(res.status.code === 2000) {
            this.setState(()=>({
              backend:res.content.data
            }));
          } else {
            this.props.history.push('/page-no-found');
          }
        });
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push('/login');
    }
  };

  addReply = (value) => {
    const data = {
      body:value,
      is_anonymous:false
    };
    try {
      fetch(
        `${urlPrefix}/comments/${this.props.commentId}/replies`,
        {
          method:'POST',
          headers:generateHeaders(),
          body:JSON.stringify(data)
        }
      ).then((res)=>(
        res.json()
      )).then(()=>{
        this.fetchNow();
        this.props.onShowReply();
        if(!this.props.showReplies){
          this.props.showRepliesFunc();
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  
  render(){
    const {backend} = this.state;
    return (backend !== null) ? (
      <div>
        {this.props.showGive ? (
          <AddReply
            addComments={this.addReply}
          />
        ) : null}
        {this.props.showReplies ? backend.map((item)=>(
          <ReplyCard key={item.id} data={item}/>
        )) : null}
      </div>
    ):(
      <div>
        loading
      </div>
    );
  }
}

Reply.propTypes = {
  commentId: PropTypes.number.isRequired,
  onShowReply: PropTypes.func.isRequired,
  showRepliesFunc: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  showGive: PropTypes.bool.isRequired,
  showReplies: PropTypes.bool.isRequired,
};

export default withRouter(Reply);
