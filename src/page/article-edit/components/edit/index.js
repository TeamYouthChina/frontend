import React from 'react';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBRow,
  MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon,
} from 'mdbreact';
import { AdvantageTag } from '../../../question-edit/components/tags';
import classes from './edit.module.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import {isLogin, urlPrefix, generateHeaders, getAsync} from '../../../../tool/api-helper';
import Cookies from 'js-cookie';
const myUploadFn = (param) => {

  const serverURL = urlPrefix;
  const xhr = new XMLHttpRequest;
  const fd = new FormData();

  const successFn = (response) => {
    if(xhr.readyState === 4 && response) {
      const id = xhr.responseText.slice(11,30);
      try {
        fetch(
          `${urlPrefix}/static/${id}`,
          {
            method:'GET',
            headers:generateHeaders(),
            body:null
          },
        ).then((response)=>
          response.json()
        ).then((response)=>{
          param.success({
            url: response.content,
            meta: {
              id: 'xxx',
              title: 'xxx',
              alt: 'xxx',
              loop: true, // 指定音视频是否循环播放
              autoPlay: true, // 指定音视频是否自动播放
              controls: true, // 指定音视频是否显示控制栏
              poster: 'http://xxx/xx.png', // 指定视频播放器的封面
            }
          });
        },()=>{
          alert('bad request');
        });
      } catch (e) {
        alert(e);
      }
    }
    // 假设服务端直接返回文件上传后的地址
    // 上传成功后调用param.success并传入上传后的文件地址

  };
  const progressFn = (event) => {
    // 上传进度发生变化时调用param.progress
    param.progress(event.loaded / event.total * 100);
  };

  const errorFn = (response) => {
    // 上传发生错误时调用param.error
    param.error({
      msg: 'unable to upload.',
      a:response
    });
  };
  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);
  fd.append('file', param.file);
  xhr.open('POST', serverURL, true);
  xhr.setRequestHeader('X-AUTHENTICATION',Cookies.get('token'));
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
      title: '',
      write: null,
      submit: null,
      editorState: null,
      showNow: 0,
      myUploadFn: null,
      previewNow: false
    };
    this.text = ArticleCreate.i18n[languageHelper()];
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  async componentDidMount() {
    if (isLogin()) {
      const write = this.props.match.params.id !== undefined ? '编辑文章' : '写文章';
      const submit = this.props.match.params.id !== undefined ? '提交' : '发布';
      let htmlContent = '';
      let title = null;
      if(this.props.match.params.id !== undefined) {
        try {
          const result = await getAsync(`/articles/${this.props.match.params.id}`);
          if(result.status.code === 200) {
            if(result.content.author && (result.content.author.id !== Number(window.localStorage.id))){
              return this.props.history.push(`/article/${this.props.match.params.id}`);
            }
            title = result.content.title;
            htmlContent = JSON.parse(result.content.body.braftEditorRaw).braftEditorRaw;
            this.setState(()=>({
              backend: '',
              title,
              write,
              submit,
              editorState: BraftEditor.createEditorState(htmlContent),
            }));
          } else {
            this.props.history.push('/page-no-found');
          }
        } catch (e) {
          alert(e);
        }
      } else {
        this.setState(()=>({
          backend: '',
          write,
          submit,
          editorState: BraftEditor.createEditorState(htmlContent),
        }));
      }
    } else {
      this.props.history.push('/login');
    }
  }

  handleSetInput = (e) => {
    // console.log(this.input.current.value)
    let value = e.target.value;
    this.setState({
      title: value
    });
  };

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

  makePreviewText = (richText) => {
    let textLength = 0;
    let blockCount = 0;
    let previewText = '';
    while (textLength < 101) {
      if(richText.blocks[blockCount].text !== ''){
        let end = richText.blocks[blockCount].text.length < (101 - textLength) ? richText.blocks[blockCount].text.length : 101 - textLength;
        previewText += richText.blocks[blockCount].text.slice(0, end);
        textLength += end;
      }
      if(richText.blocks[++blockCount] === undefined){
        break;
      }
    }
    return previewText;
  };

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
    const previewText = this.makePreviewText(this.state.editorState.toRAW(true));
    const data = {
      title: title,
      body: {
        braftEditorRaw: JSON.stringify({
          braftEditorRaw:this.state.editorState.toRAW(true)
        }),
        previewText: previewText,
        compiletype: 1
      },
      rela_id: 0,
      rela_type: 0,
      is_anonymous: false
    };
    if(this.props.match.params.id === undefined) {
      try {
        fetch(
          `${urlPrefix}/articles`,
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
          if(response.status.code === 200) {
            this.dealLabel(response.content.id, 2);
            this.props.history.push(`/article/${response.content.id}`);
          }
        },()=>{
          alert('bad request');
        });
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        fetch(
          `${urlPrefix}/articles/${this.props.match.params.id}`,
          {
            method:'PUT',
            headers:generateHeaders(),
            body:JSON.stringify(data)
          },
        ).then((response)=>(
          response.json()
        )).then((response)=>{
          this.setState({
            show:false
          });
          if(response.status.code === 200) {
            this.dealLabel(this.props.match.params.id, 2);
            this.props.history.push(`/article/${this.props.match.params.id}`);
          }
        },()=>{
          alert('bad request');
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  // 存储优势标签
  tellLabel = (select, oriLabel) => {
    if(oriLabel !== void 0){
      this.setState(()=>({
        select,
        oriLabel
      }));
    } else {
      this.setState(()=>({
        select,
      }));
    }
  };
  // 处理新产生的标签
  dealLabel = async (id, type) => {
    let { select, oriLabel } = this.state;
    for(let i=0;i<select.length;i++){
      let s = select[i];
      let o = oriLabel[i];
      if(o !== void 0){
        if(s.status !== o.status) {
          if(s.status === 'POST'){
            const data = {
              label_code: String(s.id),
              target_id: id,
              target_type: type
            };
            await fetch(
              `${urlPrefix}/labels`,
              {
                method:s.status,
                headers:generateHeaders(),
                body:JSON.stringify(data)
              },
            );
          } else {
            await fetch(
              `${urlPrefix}/labels/${s.id}/${type}/${id}`,
              {
                method:s.status,
                headers:generateHeaders(),
                body:null
              },
            );
          }
        }
      } else {
        if(s.status === 'POST'){
          const data = {
            label_code: String(s.id),
            target_id: id,
            target_type: type
          };
          await fetch(
            `${urlPrefix}/labels`,
            {
              method:s.status,
              headers:generateHeaders(),
              body:JSON.stringify(data)
            },
          );
        }
      }
    }
  };

  render() {
    const {editorState} = this.state;
    // const extendControls = [
    //   {
    //     key: 'custom-button',
    //     type: 'button',
    //     text: '预览',
    //     onClick: this.preview
    //   }
    // ];
    return (this.state.backend !== null) ? (
      <div className={classes.wrapper}>
        <select>
          <option>
            
          </option>
        </select>
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
                  value={this.state.title}
                />
              </MDBCol>
            </MDBRow>
            <AdvantageTag type={2} id={this.props.match.params.id} tellLabel={this.tellLabel}/>
            <div className={classes.editWrapper}>
              <div>
                <div className={classes.articleWrapper}>
                  <MDBRow className={classes.mdbRowWrapper}>
                    <div className="myAnswerText">
                      <div className="editor-wrapper" style={{height: '100%', minHeight: '400px'}}>
                        <BraftEditor
                          media={{uploadFn:myUploadFn}}
                          value={editorState} contentStyle={{height: '100%'}}
                          onChange={(editorState) => this.handleEditorChange(editorState)}
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
    ) : (
      <div>
        loading
      </div>
    );
  }
}

ArticleCreate.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

ArticleCreate.i18n = [
  {
    title: '请输入文章标题（限50字以内）',
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
