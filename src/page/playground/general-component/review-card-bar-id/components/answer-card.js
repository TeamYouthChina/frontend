import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {languageHelper} from '../../../../../tool/language-helper';
import { getAsync } from '../../../../../tool/api-helper';
import {Redirect} from 'react-router-dom';
import UserInfor from '../containers/user-infor/user-infor';
import Comments from '../comment-card-bar';
import Footer from '../containers/footer/footer';
import classes from './index.module.css';

export class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom: false,
      isCollapsed: true,
      showComments: false,
      commentsText: null,
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
      backend:null
    };
    this.sliceText = this.sliceText.bind(this);
    this.orderScroll = this.orderScroll.bind(this);
    this.handleSpanClick = this.handleSpanClick.bind(this);
    this.showCommentsFunc = this.showCommentsFunc.bind(this);
    // 多语言
    this.text = AnswerCard.i18n[languageHelper()];
  }
  // 展开内容
  handleSpanClick() {
    // console.log(this.props.type,1)
    let isCollapsed = !this.state.isCollapsed;
    if (isCollapsed) {
      // this.divNow.style.height='100px'
      this.setState({
        stickyRow: {background: '#FFFFFF'},
        isCollapsed: true
      });
    } else {
      // this.divNow.style.height='400px'
      this.setState({
        isCollapsed: false,
        stickyRow: {
          background: '#FFFFFF',
          position: 'sticky',
          bottom: '0'
        }
      });
    }
  }
  // 截断文章
  sliceText(body) {
    if(body.braftEditorRaw === '') {
      return '<在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。<br>技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。<br>截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。<br>在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？>';
    } else {
      return body.braftEditorRaw.slice(1, 300);
    }
  }
  // 滚动处理
  orderScroll() {
    let discount = 0;
    if (this.scrollSpan) {
      discount = document.documentElement.clientHeight - this.scrollSpan.getBoundingClientRect().top;
    }
    setTimeout(() => {
      if (!this.state.isCollapsed) {
        if (discount > 250) {
          this.setState({
            showBottom: true,
          });
        } else if (discount < 240) {
          this.setState({
            showBottom: false,
          });
        }

      }
    }, 100);
  }
  // 展开评论
  showCommentsFunc() {
    let commentsTextNow = this.state.commentsText === `${this.state.backend.comments.comments.length}条评论` ? '收起评论' : `${this.state.backend.comments.comments.length}条评论`;
    let showComments = this.state.commentsText === `${this.state.backend.comments.comments.length}条评论`;
    this.setState({
      commentsText:commentsTextNow,
      showComments
    });
  }
  // 添加滚动和获取内容
  async componentDidMount() {
    window.addEventListener('scroll', this.orderScroll);
    if(this.props.reviewId !== undefined) {
      try {
        const results = await getAsync(`/editorials/${this.props.reviewId}`);
        if(results.status.code === '403'){
          return (<Redirect to={'/login'} />);
        } else if(results.status.code === '404'){
          return (<Redirect to={'/page-not-found'} />);
        } else {
          this.setState(()=>({
            backend:results.content,
            commentsText:`${results.content.comments.comments.length}条评论`
          }));
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.setState({
        backend:this.props.fullText
      });
    }
  }
  clickActive = (type) => {
    if(type === 'attention') {
      const attention = !this.state.backend.attention;
      this.setState(()=>({
        backend:{...this.state.backend,attention}
      }));
    } else {
      const evaluateStatus = this.state.backend.evaluateStatus;
      if(evaluateStatus === 3) {
        this.setState(()=>({
          backend:{
            ...this.state.backend,
            evaluateStatus:1
          }
        }));
      } else {
        this.setState(()=>({
          backend:{
            ...this.state.backend,
            evaluateStatus:3
          }
        }));
      }
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <React.Fragment>
        <div className={classes.cardWrapper} ref={(span) => this.scrollSpan = span}>
          <UserInfor
            score={5}
            user={backend.author.username}
            description={backend.author.role[0]}
            isCollapsed={this.state.isCollapsed}
            short={this.sliceText(backend.body)}
            handleSpanClick={this.handleSpanClick}
            // editorState={this.state.editorState.toHTML()}
          />
          {this.state.showBottom || this.state.isCollapsed ? (
            <Footer
              editTime={'1天前'}
              commentsText={this.state.commentsText}
              isCollapsed={this.state.isCollapsed}
              showComments={this.showCommentsFunc}
              handleSpanClick={this.handleSpanClick}
              stickyRow={this.state.stickyRow}
              evaluateStatus={backend.evaluateStatus}
              clickActive={this.clickActive}
              attention={backend.attention} 
              attentionCount={backend.attentionCount} 
              upvoteCount={backend.upvoteCount}/>
          ) : null}
        </div>
        {this.state.showComments ? (
          <Comments
            showComments={this.showCommentsFunc}
            getCurrentPage={this.getCurrentPage}
            commentsText={this.state.commentsText}
            commentsType={'answer'}
          />
        ) : null}
      </React.Fragment>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

AnswerCard.propTypes = {
  // id
  reviewId: PropTypes.number,
  // 全文
  fullText: PropTypes.object,
};

AnswerCard.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default AnswerCard;
