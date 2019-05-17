import React, {Component} from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from 'react-cropper';
import DeImg from './img/child.png';
import style from './index.module.css';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
/* global FileReader */

const src = DeImg;

export class ChangeAvatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.name = null;
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }
  // 实时显示
  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    //copy名字
    this.name = files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  }
  // 切割
  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    const result = this.dataURLtoFile(this.cropper.getCroppedCanvas().toDataURL(), this.name);
    const formData = new FormData();
    formData.append('file', result);
    this.myUploadFn(result);
  }
  // 上传获取id
  myUploadFn = (file) => {

    const serverURL = 'http://test.zzc-tongji.com/api/v1/static';
    const xhr = new XMLHttpRequest;
    const fd = new FormData();

    const successFn = (response) => {
      if(xhr.readyState === 4 && response) {
        const id = xhr.responseText.slice(11,30);
        try{
          fetch(`http://test.zzc-tongji.com/api/v1/static/${id}`,{
            method:'GET',
            headers:new Headers({
              'X-AUTHENTICATION':Cookies.get('token')
            }),
            body:null
          }).then((res)=>(res.json())).then((res)=>{
            this.setState(()=>({
              cropResult:res.content
            }));
            this.props.history.push('/my/profile');
          });
        }catch (e) {
          alert(e);
        }
      }
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址

    };
    xhr.addEventListener('load', successFn, false);
    fd.append('file', file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader('X-AUTHENTICATION',Cookies.get('token'));
    xhr.send(fd);
  };
  // 使用默认
  useDefaultImage() {
    this.setState({src});
  }
  // blob转码
  convertBase64ToBlob = (base64) => {
    let base64Arr = base64.split(',');
    let imgtype = '';
    let base64String = '';
    if(base64Arr.length > 1){
      //如果是图片base64，去掉头信息
      base64String = base64Arr[1];
      imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1,base64Arr[0].indexOf(';'));
    }
    // 将base64解码
    let bytes = atob(base64String);
    //var bytes = base64;
    let bytesCode = new ArrayBuffer(bytes.length);
    // 转换为类型化数组
    let byteArray = new Uint8Array(bytesCode);

    // 将base64转换为ascii码
    for (let i = 0; i < bytes.length; i++) {
      byteArray[i] = bytes.charCodeAt(i);
    }

    // 生成Blob对象（文件对象）
    return new Blob( [bytesCode] , {type : imgtype});
  };
  //将base64转换为文件
  dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  };

  render() {
    return (
      <div>
        <div className={style.wrapper}>
          <div className={style.cropWrapper}>
            {this.state.src === DeImg ? (
              <div className={style.uploadStyle}>
                <div className={style.uploadLabel}>
                  <i className={style.uploadIcon} />
                  <span className={style.upText}>
                  上传图片
                </span>
                </div>
                <input className={style.upInput} type="file" accept="image/*" onChange={this.onChange} id="123"/>
              </div>
            ) : (
              <React.Fragment>
                <Cropper
                  style={{width: '100%', height: '100%'}}
                  aspectRatio={16 / 16}
                  preview=".img-preview"
                  guides={false}
                  src={this.state.src}
                  ref={cropper => {
                    this.cropper = cropper;
                  }}
                />
                <h1 className={style.hintStyle} onClick={this.useDefaultImage}>重新选择</h1>
              </React.Fragment>
            )}
          </div>
          <div className={style.preWrapper}>
            <h1 className={style.hintStyle}>Preview</h1>
            <div className="box">
              {this.state.src === DeImg ? (
                <img src={this.state.src} alt="defaultImg" style={{width: '128px', height: '128px'}} />
              ) : (
                <div
                  className="img-preview"
                  style={{
                    width: '128px',
                    height: '128px',
                    overflow: 'hidden',
                    border: '1px solid black'
                  }} />
              )}
            </div>
            <h1 className={style.hintStyle}>当前头像</h1>
          </div>
          <br style={{clear: 'both'}} />
        </div>
        <div className={style.btnWrapper}>
          <button className={this.state.src === DeImg ? `${style.cropBtnDis} disabled` : style.cropBtn} onClick={this.cropImage}>
            确认裁剪
          </button>
        </div>
      </div>
    );
  }
}

ChangeAvatar.propTypes = {
  history: PropTypes.object.isRequired,
};
