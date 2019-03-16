import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {languageHelper} from '../../../../../tool/language-helper';
// import {CommentsCard} from '../question/comment-test'
// import {PaginationUse} from '../question/pagination-test'

import Title from '../containers/title';
import UserInfor from '../containers/user-infor';
import Footer from '../containers/footer';

import {action} from '../store';
import {connect} from 'react-redux';

export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom:false
    };
    this.sliceText = this.sliceText.bind(this);
    this.orderScroll = this.orderScroll.bind(this);
    // 多语言
    this.text = AnswerCard.i18n[languageHelper()];
  }

  sliceText(answers) {
    if (answers.length !== 0) {
      if (answers[0].body) {
        let text = answers[0].body.braftEditorRaw.blocks[0].text;
        if (text.length > 300) {
          return text.slice(1, 300) + '......';
        } else {
          return text;
        }
      }
    }
    return '<在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。<br>技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。<br>截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。<br>在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？>';
  }

  orderScroll() {
    let discount = 0;
    if (this.scrollSpan) {
      discount = document.documentElement.clientHeight - this.scrollSpan.getBoundingClientRect().top;
    }
    setTimeout(() => {
      if(!this.props.isCollapsed) {
        if(discount > 250) {
          this.setState({
            showBottom:true,
          });
        } else if(discount < 240){
          this.setState({
            showBottom:false,
          });
        }
        
      }
    }, 100);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.orderScroll);
    this.props.changeAnswerData();
  }

  // addComments(e) {
  //   let {commentLists = []} = this.state.backend;
  //   commentLists.unshift(this.input.value);
  //   // console.log(commonLists,this.props.id)
  //   this.setState({
  //     backend: {
  //       commentLists: commentLists,
  //       ...this.state.backend
  //     }
  //   });
  //   e.stopPropagation();
  // }

  // todo,拿到点击好的页吗
  // getCurrentPage(currentPage) {
  //
  // }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    return (this.props.backend !== null) ? (
      <React.Fragment>
        <div style={{background: '#FFFFFF', padding: '20px 30px', borderRadius: '2px'}}
             ref={(span) => this.scrollSpan = span}>
          <Title
            title={this.props.backend.title}
            basicFont={this.props.basicFont} />
          <UserInfor
            score={5}
            user={this.props.backend.creator.username}
            description={'weYouth负责人'}
            readingTime={6}
            isCollapsed={this.props.isCollapsed}
            short={this.sliceText(this.props.backend.answers)}
            handleSpanClick={this.props.handleSpanClick}
            basicFont={this.props.basicFont}
            // editorState={this.state.editorState.toHTML()}
            liBasicNoLine={this.props.liBasicNoLine}
            ulBasicNoLine={this.props.ulBasicNoLine} />
          {this.state.showBottom || this.props.isCollapsed ? (
            <Footer
              editTime={'1'}
              commentsText={this.props.commentsText}
              isCollapsed={this.props.isCollapsed}
              showComments={this.props.showComments}
              handleSpanClick={this.props.handleSpanClick}
              basicFont={this.props.basicFont}
              stickyRow={this.props.stickyRow} />
          ) : null}
        </div>
        
        
        {/*{this.state.showComments ? (*/}
        {/*<div style={{marginTop: '15px', background: '#FFFFFF', padding: '19px 32px', borderRadius: '2px'}}>*/}
        {/*<MDBRow style={{*/}
        {/*margin: '0px 0px 11px 0px',*/}
        {/*fontSize: '16px',*/}
        {/*color: '#8D9AAF', ...basicFont*/}
        {/*}}>{this.state.backend.commonLists.length}条评论</MDBRow>*/}
        {/*<MDBRow style={{margin: '0px', display: 'flex'}}>*/}
        {/*<MDBAvatar style={{height: '100%', margin: '6px 11px 6px 0px', flexGrow: '0'}}>*/}
        {/*<img*/}
        {/*style={{width: '32px', background: '#F4F4F4'}}*/}
        {/*src={this.state.backend.img}*/}
        {/*alt=""*/}
        {/*className="rounded-circle"*/}
        {/*/>*/}
        {/*</MDBAvatar>*/}
        {/*<div style={{marginTop: '5px', flexGrow: '1',}}>*/}
        {/*<input style={{*/}
        {/*width: '100%',*/}
        {/*background: '#FFFFFF',*/}
        {/*border: '1px solid #DBE5F7',*/}
        {/*boxSizing: 'border-box',*/}
        {/*borderRadius: '2px',*/}
        {/*padding: '8px 0px 8px 20px',*/}
        {/*fontSize: '14px',*/}
        {/*color: '#B3C1DB',*/}
        {/*height: '37px',*/}
        {/*...basicFont,*/}
        {/*}} ref={(input) => (this.input = input)} placeholder="发表你的评论..."/>*/}

        {/*</div>*/}


        {/*<MDBBtn onClick={(e) => this.addComments(e)} flat*/}
        {/*style={{*/}
        {/*flexGrow: '0',*/}
        {/*background: '#C4C4C4',*/}
        {/*padding: '8px 20px',*/}
        {/*color: '#FFFFFF', ...basicFont,*/}
        {/*margin: '6px 6px 5px 6px',*/}
        {/*}}>*/}
        {/*发布*/}
        {/*</MDBBtn>*/}

        {/*</MDBRow>*/}
        {/*/!*{this.state.backend.commonLists.map((item) => (*!/*/}
        {/*/!*<CommentsCard key={item} message={item}></CommentsCard>*!/*/}
        {/**/}
        {/*/!*))}*!/*/}
        {/*/!*{this.state.backend.commonLists.length !== 0 ? (*!/*/}
        {/*/!*<MDBRow center style={{marginTop: '10px'}}>*!/*/}
        {/*/!*<PaginationUse pageConfig={{totalPage: Math.ceil(this.state.backend.commonLists.length / 3)}}*!/*/}
        {/*/!*pageCallbackFn={this.getCurrentPage}></PaginationUse>*!/*/}
        {/*/!*</MDBRow>*!/*/}
        {/*/!*) : null}*!/*/}
        {/*<MDBRow center style={{marginTop: '9px'}}>*/}
        {/*<MDBBtn onClick={this.showComments} flat*/}
        {/*style={{margin: '0px', padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...basicFont}}>*/}
        {/*收起评论<MDBIcon style={{marginLeft: '5px'}} icon="arrow-up"/>*/}
        {/*</MDBBtn>*/}
        {/*</MDBRow>*/}
        {/*</div>*/}

        {/*) : null}*/}
      </React.Fragment>
    ) : (
      <div>
        123
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  backend: state.answerReducer.backend,
  editorState: state.answerReducer.editorState,
  isCollapsed: state.answerReducer.isCollapsed,
  showBottom: state.answerReducer.showBottom,
  showComments: state.answerReducer.showComments,
  commentsText: state.answerReducer.commentsText,
  pageConfig: state.answerReducer.pageConfig,
  stickyRow: state.answerReducer.stickyRow,
  liBasicNoLine: state.answerReducer.liBasicNoLine,
  ulBasicNoLine: state.answerReducer.ulBasicNoLine
});

const mapDispatchToProps = (dispatch) => ({

  changeAnswerData: () => {
    dispatch(action.changeAnswerData());
  },
  
  handleSpanClick: (isCollapsed) => {
    dispatch(action.changeBottomStyle(isCollapsed));
  },

  showComments: (commentsText, counts) => {
    dispatch(action.showComments(commentsText, counts));
  },

});

AnswerCard.propTypes = {
  questionId: PropTypes.string,
  commentsText: PropTypes.string,
  backend: PropTypes.object,

  basicFont: PropTypes.object,
  liBasicNoLine: PropTypes.object,
  ulBasicNoLine: PropTypes.object,
  stickyRow: PropTypes.object,

  changeAnswerData: PropTypes.func,
  handleSpanClick: PropTypes.func,
  orderScroll: PropTypes.func,
  showComments: PropTypes.func,

  showBottom: PropTypes.bool,
  isCollapsed: PropTypes.bool,
};

AnswerCard.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCard);
