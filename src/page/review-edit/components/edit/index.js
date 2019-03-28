import React from 'react';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdbreact';
import ArticleEditInit from '../articleEditInit';
import classes from './edit.module.css';

const basicFont = {
  fontFamily: 'IBM Plex Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: 'normal',
};

class ReviewCreate extends React.Component {
  constructor(props) {
    super(props);
    /*
    * */
    this.state = {
      backend: null,
      showPic: false,
      title:'空标题',
      write:null,
      submit:null
    };
    this.text = ReviewCreate.i18n[languageHelper()];
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getObjectURL = this.getObjectURL.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.handleSetInput = this.handleSetInput.bind(this);
  }

  componentWillMount() {
    let mockData =
      {
        id: 0,
        status: {
          code: 2000
        }
      };
    const write = this.props.match.params.aid !== undefined ? '编辑短则' : '写短则';
    const submit = this.props.match.params.aid !== undefined ? '提交' : '发布';
    this.setState(() => {
      return {
        backend: mockData,
        write,
        submit
      };
    });
  }
  //todo,和服务器的链接
  handleInputChange(e) {
    // if(e.target.files.length > 1){
    //   e.target.value = null
    //   e.target.files.unshift()
    // }
    // 利用自带方法制造url
    let imgSrcI = this.getObjectURL(e.target.files[0]);
    this.setState({
      showPic: true
    });
    this.imgUrl.src = imgSrcI;
  }
  // 富文本提交
  handleInputClick() {
    //todo,通过refs调用的方法
    this.answerText.submitContent();
    // this.refs.answerText.submitContent();
  }
  // 删除图片
  deletePic(){
    this.imgUrl.src = '';
    // 避免重复照片不能上传
    this.input.value = null;
    this.setState({
      showPic: false
    });
  }
  // 转化上传文件到url
  getObjectURL(file) {
    let url = null;
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  handleSetInput(e){
    // console.log(this.input.current.value)
    let value = e.target.value;
    setTimeout(()=>(
      this.setState({
        title:value
      })
    ),100);
  }

  render() {
    return (this.state.backend && this.state.backend.status && this.state.backend.status.code === 2000) ? (
      <div>
        <MDBRow style={{margin: '3.67vw 0'}}>
          <MDBCol size="1"></MDBCol>
          <MDBCol size="10" style={{height: '100%'}}>
            <MDBRow style={{margin: '1.71vw 0px'}}>
              <MDBCol size="4" style={{paddingLeft:'0',fontSize: '1.87vw',color:'#8D9AAF',verticalAlign: 'middle', ...basicFont}}>
                {this.state.write}
              </MDBCol>
              <MDBCol size="4">
                
              </MDBCol>
              <MDBCol size="4" style={{paddingRight: '0'}}>
                <MDBBtn color="indigo" style={{
                  fontSize: '1.25vw',
                  padding: '0.78vw 2.65vw',
                  margin: '-.39vw 0',
                  float: 'right', ...basicFont
                }}>{this.state.submit}
                </MDBBtn>
              </MDBCol>

            </MDBRow>
            <MDBRow style={{margin: '1.71vw 0px'}}>
              <div>
                <img
                  style={{width: '2.96vw', background: '#F4F4F4', marginRight: '0.859vw'}}
                  src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                  alt="123"
                  className="rounded-circle"
                />
                <span className={classes.titleSpan}>123</span>
              </div>
            </MDBRow>
            <MDBRow style={{marginTop:'20px'}}>
            </MDBRow>
            <ArticleEditInit 
              inputData={this.state.title} 
              ref={(answerText) => this.answerText = answerText}
            />
            <div style={{
              width:'88px',
              height:'28px',
              marginTop:'10px',
              background: '#F0F3FA',
              borderRadius: '20px',
              justifyContent: 'center',
              display:'flex',
              alignItems:'center',
              fontSize: '14px',
              color:'#4F65E1',
              ...basicFont}}>
              标签1
            </div>
            <div className={classes.FTDquestion} style={{margin:'0px'}}>
              <MDBInput style={{padding:'0px'}} label="匿名提问" type="checkbox" id="checkbox1" />
            </div>
          </MDBCol>
          <MDBCol size="1">

          </MDBCol>
        </MDBRow>
      </div>
    ) : null;
  }
}

ReviewCreate.propTypes = {
  match: PropTypes.object.isRequired,
};

ReviewCreate.i18n = [
  {
    title: '请输入回答标题（限50字以内）',
    submitBtn: '提交文章',
    write: '写文章'
  },
  {
    title: 'Title',
    submitBtn: 'submit article',
    write: 'write article'
  },
];

export default withRouter(ReviewCreate);
