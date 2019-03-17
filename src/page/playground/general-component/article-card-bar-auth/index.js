import React from 'react';
// import BraftEditor from 'braft-editor';
import PropTypes from 'prop-types';
import {languageHelper} from '../../../../tool/language-helper';

import Title from '../answer-card-bar-auth/containers/title';
import UserInfor from './containers/user-infor';
import Footer from '../answer-card-bar-auth/containers/footer';
import Comments from '../comment-card-bar';

import { action } from '../answer-card-bar-auth/store';
import { connect } from 'react-redux';

export class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: null,
      showBottom: false,
      isCollapsed: true,
      showComments: false,
      commentsText: '2条评论',
      pageConfig: {
        totalPage: 14 //总页码
      },
      stickyRow: {background: '#FFFFFF'},
    };
    this.sliceText = this.sliceText.bind(this);
    this.orderScroll = this.orderScroll.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.handleSpanClick = this.handleSpanClick.bind(this);
    this.showCommentsFunc = this.showCommentsFunc.bind(this);
    // 多语言
    this.text = ArticleCard.i18n[languageHelper()];
  }

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
          bottom: '0px'
        }
      });
    }
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

  showCommentsFunc() {
    let commentsTextNow = this.state.commentsText === '2条评论' ? '收起评论' : '2条评论';
    let showComments = this.state.commentsText === '2条评论';
    this.setState({
      commentsText:commentsTextNow,
      showComments
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.orderScroll);
    this.props.changeAnswerData();
  }

  // todo,拿到点击好的页吗
  getCurrentPage() {

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.orderScroll);
  }

  render() {
    return (this.props.backend !== null) ? (
      <React.Fragment>
        <div style={{background: '#FFFFFF', padding: '20px 30px', borderRadius: '2px'}} ref={(span) => this.scrollSpan = span}>
          <Title
            title={this.props.backend.title}
            basicFont={this.props.basicFont} />
          <UserInfor
            score={5}
            user={this.props.backend.creator.username}
            description={'weYouth负责人'}
            readingTime={6}
            isCollapsed={this.state.isCollapsed}
            short={this.sliceText(this.props.backend.answers)}
            handleSpanClick={this.handleSpanClick}
            basicFont={this.props.basicFont}
            // editorState={this.state.editorState.toHTML()}
            liBasicNoLine={this.props.liBasicNoLine}
            ulBasicNoLine={this.props.ulBasicNoLine} />
          {this.state.showBottom || this.state.isCollapsed ? (
            <Footer
              editTime={'1天前'}
              commentsText={this.state.commentsText}
              isCollapsed={this.state.isCollapsed}
              showComments={this.showCommentsFunc}
              handleSpanClick={this.handleSpanClick}
              basicFont={this.props.basicFont}
              stickyRow={this.state.stickyRow} />
          ) : null}
        </div>

        {this.state.showComments ? (
          <Comments
            showComments={this.showCommentsFunc}
            getCurrentPage={this.getCurrentPage}
            commentsText={this.state.commentsText}
          />
        ) : null}
      </React.Fragment>
    ) : (
      <div>
        123
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  backend: state.answer.backend,
  editorState: state.answer.editorState,

  liBasicNoLine: state.answer.liBasicNoLine,
  ulBasicNoLine: state.answer.ulBasicNoLine
});

const mapDispatchToProps = (dispatch) => ({

  changeAnswerData: () => {
    dispatch(action.changeAnswerData());
  },

});

ArticleCard.propTypes = {
  articleId: PropTypes.number.isRequired,
  backend: PropTypes.object,

  basicFont: PropTypes.object,
  liBasicNoLine: PropTypes.object,
  ulBasicNoLine: PropTypes.object,

  changeAnswerData: PropTypes.func.isRequired,

};

ArticleCard.i18n = [
  {
    related: '类似职位推荐',
  },
  {
    related: 'Related Work',
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCard);
