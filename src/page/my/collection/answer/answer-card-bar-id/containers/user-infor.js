import React from 'react';
import PropTypes from 'prop-types';
import {MDBAvatar, MDBIcon, MDBRow} from 'mdbreact';

export const UserInfor = (props) => (
  <div>
    <MDBRow style={{margin: '0.781vw 0'}}>
      <MDBAvatar style={{height: '100%', margin: '0.469vw 0.859vw 0.469vw 0'}}>
        <img
          style={{width: '2.5vw', background: '#F4F4F4'}}
          src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
          alt="123"
          className="rounded-circle"
        />
      </MDBAvatar>
      <span style={{
        marginRight: '0.781vw',
        padding: '0.781vw 0',
        color: '#31394D',
        fontSize: '1.093vw', ...props.basicFont
      }}>
        {props.user}
      </span>
      <span style={{
        padding: '0.781vw 0',
        color: '#8D9AAF',
        justifyContent: 'flex-start',
        fontSize: '1.093vw', ...props.basicFont
      }}>{props.description}
      </span>
    </MDBRow>

    {props.isCollapsed ? (
      <div>
        {/*<span style={{color: '#3E4850', fontSize: '14px', ...basicFont}}>{this.state.backend.user}</span>:*/}
        <ul style={props.ulBasicNoLine}>
          {/*<li style={{color: '#8D9AAF', fontSize: '14px', ...props.liBasicNoLine, margin: '10px 0px'}}>*/}
          {/*预计阅读时间: {props.readingTime}分钟*/}
          {/*</li>*/}
          <li style={{color: '#31394D', fontSize: '1.093vw', ...props.liBasicNoLine, ...props.basicFont}}>
            {props.short}
          </li>
          <li onClick={props.handleSpanClick} style={{
            color: '#4F65E1',
            fontSize: '1.093vw', ...props.liBasicNoLine, ...props.basicFont,
            margin: '0.781vw 0 0 0'
          }}>
            展开更多<MDBIcon style={{marginLeft: '0.391vw'}} icon="arrow-down" />
          </li>
        </ul>

      </div>
    ) : (
      <span
        // dangerouslySetInnerHTML={{__html: props.editorState}}
        style={{color: '#31394D', fontSize: '1.093vw', ...props.basicFont}}>
            在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？
            在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？
            在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？
            在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？
            在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚，取代原来的技术平台，成为新的主流趋势。到了今天，微软在互联网时代江河日下，谷歌和facebook大肆收购，花上百亿美元去买下新兴的技术，为的是什么？就是在押宝呀。技术在不断向前升级，哪一个方向才是未来的主流趋势呢？没有人知道。对于腾讯来说，也是一样的。小马哥每天都在为这件事情而焦虑。截至目前，在国内，押中两次宝的就只有腾讯和阿里。阿里押中了淘宝和支付宝，腾讯押中了QQ和微信。在移动互联网时代，腾讯可以稍稍松一口气了，但是在下一个主流技术趋势到来的时候，还有这个好运气么？
      </span>
    )}
  </div>
);


UserInfor.defaultProps = {
  score: 5,
  user: '齐昊',
  description: 'weYouth负责人',
  basicFont: {
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  }
};

UserInfor.propTypes = {
  // self-data
  user: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // readingTime: PropTypes.number.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  short: PropTypes.string.isRequired,
  // func
  handleSpanClick: PropTypes.func.isRequired,
  //style
  basicFont: PropTypes.object.isRequired,
  // editorState: PropTypes.object,
  liBasicNoLine: PropTypes.object.isRequired,
  ulBasicNoLine: PropTypes.object.isRequired,

};

export default UserInfor;
