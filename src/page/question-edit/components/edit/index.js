import React from 'react';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBRow,
  MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon,
} from 'mdbreact';
import classes from './edit.module.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import '../../public/style.css';
import {isLogin, urlPrefix, generateHeaders} from '../../../../tool/api-helper';

const myUploadFn = async (param) => {
  // console.log(param)
  const serverURL = 'http://youthchinatest.oss-cn-shanghai.aliyuncs.com/2848699711584473088?Expires=1549472548&OSSAccessKeyId=LTAI0j1nGyLy6XMw&Signature=iKKT0zlXISw1eJXddMRsBSLV%2B2M%3D';
  // 数据传输协议，添加注释，类似json
  const xhr = new XMLHttpRequest();
  // 构建键值对，给内容加标记
  const fd = new FormData();
  // const result = await getAsync(serverURL);
  // console.log(result,'result')
  const successFn = (response) => {
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址
    param.success({
      a: response,
      url: 'http://youthchinatest.oss-cn-shanghai.aliyuncs.com/2848699711584473088?Expires=1549472548&OSSAccessKeyId=LTAI0j1nGyLy6XMw&Signature=iKKT0zlXISw1eJXddMRsBSLV%2B2M%3D',
      meta: {
        id: '123',
        title: '123',
        alt: '123',
        loop: true, // 指定音视频是否循环播放
        autoPlay: true, // 指定音视频是否自动播放
        controls: true, // 指定音视频是否显示控制栏
        poster: 'https://margox.cn/wp-content/uploads/2018/09/IMG_9508.jpg', // 指定视频播放器的封面
      }
    });
  };

  const progressFn = (event) => {
    // 上传进度发生变化时调用param.progress
    param.progress(event.loaded / event.total * 100);
  };

  const errorFn = (response) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.',
      response
    });
  };

  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);

  fd.append('file', param.file);
  xhr.open('POST', serverURL, true);
  xhr.send(fd);

};

class ArticleCreate extends React.Component {
  constructor(props) {
    super(props);
    /*
    * */
    this.state = {
      backend: null,
      showPic: false,
      title: null,
      write: null,
      submit: null,
      editorState: null,
      showNow: 0,
      myUploadFn: null,
      previewNow: false
    };
    this.text = ArticleCreate.i18n[languageHelper()];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getObjectURL = this.getObjectURL.bind(this);
    this.deletePic = this.deletePic.bind(this);
    this.handleSetInput = this.handleSetInput.bind(this);
  }

  componentWillMount() {
    if (isLogin()) {
      let mockData =
        {
          id: 0,
          status: {
            code: 2000
          }
        };
      const write = this.props.match.params.qid !== undefined ? '编辑问题' : '写问题';
      const submit = this.props.match.params.qid !== undefined ? '提交' : '发布';
      this.setState(() => {
        return {
          backend: mockData,
          write,
          submit
        };
      });
    } else {
      return (<Redirect to={'/login'} />);
    }
  }

  componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    const htmlContent = '';
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorState数据
    this.setState({
      editorState: BraftEditor.createEditorState(htmlContent)
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

  // 删除图片
  deletePic() {
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

  handleSetInput(e) {
    // console.log(this.input.current.value)
    let value = e.target.value;
    this.setState({
      title: value
    });
  }

  submitContent() {
    let showNow = this.state.showNow + 1;
    this.setState({
      showNow
    });
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML()
    // const result = await saveEditorContent(htmlContent)
  }

  handleEditorChange(editorState) {
    this.setState({editorState});
    // let a = JSON.stringify(this.state.editorState.toRAW(true));
    // console.log(Object.assign({blocks:this.state.editorState.toRAW(true)},{id:1}));
  }

  preview = () => {
    // this.buildPreviewHtml()
    let previewNow = !this.state.previewNow;
    this.setState({
      previewNow
    });
  };

  buildPreviewHtml() {
  }

  handleClickUp = (e) => {
    e.stopPropagation();
    this.setState({
      show:true
    });
    const title = this.state.title;
    if(title === null) {
      alert('can not be null');
      this.setState({
        show:false
      });
      return;
    }
    const data = {
      title: title,
      body: {
        braftEditorRaw: JSON.stringify(this.state.editorState.toRAW(true)),
        previewText: '',
        compiletype: 1
      },
      is_anonymous: true,
      rela_type: 0,
      rela_id: 0
    };
    try {
      fetch(
        `${urlPrefix}/questions`,
        {
          method:'POST',
          headers:generateHeaders(),
          body:JSON.stringify(data)
        },
      ).then((response)=>(
        response.json()
      )).then((response)=>{
        this.setState({
          show:false
        });
        if(response.status.code === 2000) {
          this.props.history.push(`/question/${response.content.id}`);
        }
      },()=>{
        alert('bad request');
      });
    } catch (e) {
      alert(e);
    }
  };

  render() {
    const {editorState} = this.state;
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview
      }
    ];
    return (this.state.backend && this.state.backend.status && this.state.backend.status.code === 2000) ? (
      <div className={classes.wrapper}>
        <MDBRow className={classes.mdbRow}>
          <MDBCol size="1"></MDBCol>
          <MDBCol size="10" className={classes.mdbCol}>
            <MDBRow className={classes.mdbRow2}>
              <MDBCol size="4" className={classes.mdbCol4}>
                {this.state.write}
              </MDBCol>
              <MDBCol size="4">

              </MDBCol>
              <MDBCol size="4" className={classes.mdbCol42}>
                <MDBBtn disabled={this.state.show} onClick={this.handleClickUp} className={classes.colBtn} color="indigo">
                  {this.state.submit}
                </MDBBtn>
              </MDBCol>
            </MDBRow>
            <MDBRow className={classes.mdbRow3}>
              <MDBCol>
                <input
                  className={classes.inputStyle}
                  onChange={(e) => this.handleSetInput(e)}
                  placeholder={this.text.title}
                />
              </MDBCol>
            </MDBRow>
            <div className={classes.editWrapper}>
              <div>
                <div className={classes.articleWrapper}>
                  <MDBRow className={classes.mdbRowWrapper}>
                    <div className="myAnswerText">
                      <div className="editor-wrapper" style={{height: '100%', minHeight: '400px'}}>
                        <BraftEditor
                          media={{uploadFn: myUploadFn}}
                          value={editorState} contentStyle={{height: '100%'}}
                          onChange={(editorState) => this.handleEditorChange(editorState)}
                          extendControls={extendControls}
                        />
                      </div>
                      <br />
                      <MDBModal isOpen={this.state.previewNow}>
                        <MDBModalHeader>123</MDBModalHeader>
                        <MDBModalBody>
                          {this.state.editorState !== null ? (
                            <div
                              dangerouslySetInnerHTML={{__html: this.state.editorState.toHTML()}}>
                            </div>) : null}

                        </MDBModalBody>
                        <MDBModalFooter>
                          <MDBBtn flat onClick={this.preview} far="true" style={{padding: '5px 0', marginLeft: '15px'}}>
                            <MDBIcon style={{marginRight: '5px'}} icon="thumbs-up" />提交
                          </MDBBtn>
                          <MDBBtn flat onClick={this.preview} far="true" style={{padding: '5px 10px',}}>
                            <MDBIcon style={{marginRight: '5px'}} icon="thumbs-down" />返回
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModal>
                      {/*{this.state.showNow === 0 ? null : (*/}

                      {/*)}*/}
                    </div>
                  </MDBRow>
                </div>
              </div>
            </div>
          </MDBCol>
          <MDBCol size="1">
          </MDBCol>
        </MDBRow>
      </div>
    ) : null;
  }
}

ArticleCreate.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

ArticleCreate.i18n = [
  {
    title: '请输入问题标题（限50字以内）',
    submitBtn: '提交文章',
    write: '写文章'
  },
  {
    title: 'Title',
    submitBtn: 'submit article',
    write: 'write article'
  },
];

export default withRouter(ArticleCreate);
