import React from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBBtn, MDBIcon} from 'mdbreact';
import {languageHelper} from '../../../../tool/language-helper';
import { connect } from 'react-redux';

import { AddComment } from './components/add-comment';
import CommentCard from './components/commentCard';
import { PaginationUse } from './components/pagination';

import { data } from './data';

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
    };
    this.text = Comments.i18n[languageHelper()];
    this.addComments = this.addComments.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.showReplies = this.showReplies.bind(this);
    this.giveReplies = this.giveReplies.bind(this);
  }

  componentDidMount() {
    this.setState({
      commentLists:data.content[this.props.commentsType]
    });
  }

  addComments(value){
    this.setState({
      commentLists: [{
        id: new Date(),
        creator:{
          username:'lalala'
        },
        create_at: '123',
        content: value,
      }, ...this.state.commentLists]
    });
  }
  showReplies(){
    let reply = !this.state.showReplies;
    let text = this.state.showCommentsText === '查看回复' ? '收起回复' : '查看回复';
    this.setState({
      showReplies:reply,
      showCommentsText:text
    });
  }

  giveReplies(){
    let show = !this.state.showGive;
    let text = this.state.replyText === '回复' ? '取消回复' : '回复';
    this.setState({
      showGive:show,
      replyText:text
    });
  }

  getCurrentPage(){}
  
  render() {
    return (this.state.commentLists !== null) ? (
      <div style={{marginTop: '15px', background: '#FFFFFF', padding: '19px 32px', borderRadius: '2px'}}>
        <MDBRow style={{
          margin: '0px 0px 11px 0px',
          fontSize: '16px',
          color: '#8D9AAF', ...this.props.basicFont
        }}>
          {this.state.commentLists.length}条评论
        </MDBRow>
        <AddComment 
          addComments={this.addComments} 
          basicFont={this.props.basicFont}
        />
        {this.state.commentLists.map((item) => (
          <CommentCard 
            key={item.id} 
            user={item.creator.username} 
            time={item.create_at} 
            content={item.content}
            addComments={this.addComments}
          />
        ))}
        {this.state.commentLists.length !== 0 ? (
          <MDBRow center style={{marginTop: '10px'}}>
            <PaginationUse
              pageConfig={{totalPage: Math.ceil(this.state.commentLists.length / 3)}}
              pageCallbackFn={this.getCurrentPage}
            />
          </MDBRow>
        ) : null}
        <MDBRow center style={{marginTop: '9px'}}>
          <MDBBtn onClick={this.props.showComments} flat style={{margin: '0px', padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...this.props.basicFont}}>
            收起评论<MDBIcon style={{marginLeft: '5px'}} icon="arrow-up" />
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

const mapStateToProps = (state) => ({
  basicFont:state.comment.basicFont,
});

// const mapDispatchToProps = (dispatch) => ({
//  
// });

Comments.propTypes = {
  basicFont: PropTypes.object.isRequired,
  
  commentsText: PropTypes.string.isRequired,
  commentsType: PropTypes.string.isRequired,
  
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

export default connect(mapStateToProps, null)(Comments);
