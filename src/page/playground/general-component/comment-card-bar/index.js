import React from 'react';
import PropTypes from 'prop-types';
import { MDBRow, MDBBtn, MDBIcon} from 'mdbreact';
import {languageHelper} from '../../../../tool/language-helper';
import { connect } from 'react-redux';

import { AddComment } from './components/add-comment';
import CommentCard from './components/commentCard';
import { PaginationUse } from './components/pagination';

import { action } from './store';

class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.text = Comments.i18n[languageHelper()];
  }

  componentDidMount() {
    this.props.initialCommentData();
  }

  render() {
    return (this.props.commentLists !== null) ? (
      <div style={{marginTop: '15px', background: '#FFFFFF', padding: '19px 32px', borderRadius: '2px'}}>
        <MDBRow style={{
          margin: '0px 0px 11px 0px',
          fontSize: '16px',
          color: '#8D9AAF', ...this.props.basicFont
        }}>
          {this.props.commentLists.length}条评论
        </MDBRow>
        <AddComment 
          addComments={this.props.addComments} 
          basicFont={this.props.basicFont}
        />
        {this.props.commentLists.map((item) => (
          <CommentCard 
            key={item.id} 
            user={item.user} 
            time={item.time} 
            content={item.content}
          />
        ))}
        {this.props.commentLists.length !== 0 ? (
          <MDBRow center style={{marginTop: '10px'}}>
            <PaginationUse
              pageConfig={{totalPage: Math.ceil(this.props.commentLists.length / 3)}}
              pageCallbackFn={this.props.getCurrentPage}
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
  commentLists:state.comment.commentLists,
  basicFont:state.comment.basicFont,
});

const mapDispatchToProps = (dispatch) => ({
  initialCommentData:() => {
    dispatch(action.initialCommentData());
  },
  addComments: (newComment) => {
    dispatch(action.addComments(newComment));
  },
});

Comments.propTypes = {
  basicFont: PropTypes.object.isRequired,

  commentLists: PropTypes.array,
  commentsText: PropTypes.string,
  backend: PropTypes.object,
  
  showComments: PropTypes.func.isRequired,
  getCurrentPage: PropTypes.func.isRequired,
  initialCommentData: PropTypes.func,
  addComments: PropTypes.func.isRequired,
};

Comments.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
