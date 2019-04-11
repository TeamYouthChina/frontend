import React from 'react';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  MDBBtn,
  MDBRow,
  MDBCol, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBIcon,
} from 'mdbreact';
import classes from './edit.module.css';
import {generateHeaders, getAsync, isLogin, urlPrefix} from '../../../../tool/api-helper';
import BraftEditor from 'braft-editor';

class ReviewCreate extends React.Component {
  constructor(props) {
    super(props);
    /*
    * */
    this.state = {
      backend: null,
      allTags:['标签一'],
      showPic: false,
      editorState: null,
      write:null,
      submit:null,
      hint:true,
      inputValue:null
    };
    this.text = ReviewCreate.i18n[languageHelper()];
    this.newTag = this.newTag.bind(this);
    this.deleteIcon = this.deleteIcon.bind(this);
  }

  async componentDidMount() {
    if (isLogin()) {
      const write = this.props.match.params.id !== undefined ? '编辑短则' : '写短则';
      const submit = this.props.match.params.id !== undefined ? '提交' : '发布';
      let htmlContent = '';
      if(this.props.match.params.id !== undefined) {
        try {
          const result = await getAsync(`/editorials/${this.props.match.params.id}`);
          if(result.status.code === 200) {
            htmlContent = JSON.parse(result.content.body.braftEditorRaw).braftEditorRaw;
            // console.log(htmlContent)
            this.setState(()=>({
              backend: '',
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
        braftEditorRaw: JSON.stringify({
          braftEditorRaw:this.state.editorState.toRAW(true)
        }),
        previewText: '',
        compiletype: 1
      },
      is_anonymous: true,
      rela_type: 0,
      rela_id: 0
    };
    if(this.props.match.params.id === undefined) {
      try {
        fetch(
          `${urlPrefix}/editorials`,
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
            this.props.history.push(`/review/${response.content.id}`);
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
          `${urlPrefix}/editorials/${this.props.match.params.id}`,
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
          if(response.status.code === 2000) {
            this.props.history.push(`/review/${this.props.match.params.id}`);
          }
        },()=>{
          alert('bad request');
        });
      } catch (e) {
        alert(e);
      }
    }

  };

  deleteIcon(index){
    let array = this.state.allTags;
    this.setState({
      allTags:array.slice(0,index).concat(array.slice(index+1,array.length))
    });
  }
  
  newTag(e){
    const value = e.target.value;
    let array = this.state.allTags;
    if(e.keyCode === 13) {
      if(array.indexOf(value) === 1) {
        alert('sorry for repeat');
        e.target.value = null;
        return;
      }
      array.push(value);
      e.target.value = null;
      this.setState({
        allTags:array
      });
    }
  }
  
  render() {
    const {editorState} = this.state;
    return (this.state.backend !== null) ? (
      <div>
        <MDBRow className={classes.mdbRow}>
          <MDBCol size="1"></MDBCol>
          <MDBCol size="10" className={classes.mdbCol}>
            <MDBRow style={{margin: '1.71vw 0'}}>
              <MDBCol size="4" className={classes.writeStyle}>
                {this.state.write}
              </MDBCol>
              <MDBCol size="4">
                
              </MDBCol>
              <MDBCol size="4" style={{paddingRight: '0'}}>
                <MDBBtn onClick={this.handleClickUp} className={classes.btnStyle} color="indigo">
                  {this.state.submit}
                </MDBBtn>
              </MDBCol>

            </MDBRow>
            <MDBRow className={classes.mdbRow2}>
              <div>
                <img
                  src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
                  alt="avatar"
                  className={`rounded-circle ${classes.imgStyle}`}
                />
                <span className={classes.titleSpan}>weYouth负责人</span>
              </div>
            </MDBRow>
            <div className={classes.editWrapper}>
              <div>
                <div className={classes.articleWrapper}>
                  <MDBRow className={classes.mdbRowWrapper}>
                    <div className="myAnswerText">
                      <div className="editor-wrapper" style={{height: '100%', minHeight: '31.2vw'}}>
                        <BraftEditor
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
                          <MDBBtn className={classes.submit1} flat onClick={this.preview} far="true">
                            <MDBIcon className={classes.iconStyle} icon="thumbs-up" />提交
                          </MDBBtn>
                          <MDBBtn className={classes.submit2} flat onClick={this.preview} far="true">
                            <MDBIcon className={classes.iconStyle} icon="thumbs-down" />返回
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
            {/*<div className={classes.tagWrapper}>*/}
            {/*{this.state.allTags.map((item,index)=>(*/}
            {/*<span key={index} className={classes.reviewTag}>*/}
            {/*{item}*/}
            {/*<i onClick={() => this.deleteIcon(index)} className={`fa fa-times close ${classes.deleteIcon}`} />*/}
            {/*</span>*/}
            {/*))}*/}
            {/*<input className={classes.reviewTag} onKeyDown={(e) => this.newTag(e)} type="text" placeholder='输入新标签' />*/}
            {/*</div>*/}
            
            {/*<div className={classes.FTDquestion} style={{margin:'0px'}}>*/}
            {/*<MDBInput style={{padding:'0px'}} label="匿名提问" type="checkbox" id="checkbox1" />*/}
            {/*</div>*/}
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
  history: PropTypes.object.isRequired,
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
