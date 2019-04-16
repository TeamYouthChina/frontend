import React from 'react';
import PropTypes from 'prop-types';
import {urlPrefix, generateHeaders, isLogin} from '../../../../../../tool/api-helper';
import {withRouter} from 'react-router-dom';
import ReplyCard from './cards';

class Reply extends React.Component{
  constructor(props){
    super(props);
    this.state={
      backend:null
    };
  }
  
  componentDidMount(){
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
  }
  
  
  render(){
    const {backend} = this.state;
    return (backend !== null) ? (
      <div>
        {backend.map((item)=>(
          <ReplyCard key={item.id} data={item}/>
        ))}
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
  history: PropTypes.object.isRequired,
};

export default withRouter(Reply);
