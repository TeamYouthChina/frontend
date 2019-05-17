import React from 'react';
import Cookies from 'js-cookie';

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    
  }
  handle = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    const url = 'http://test.zzc-tongji.com/api/v1/static';
    fetch(url,{
      method:'POST',
      headers:new Headers({
        'x-authentication': Cookies.get('token'),
      }),
      body:formData
    }).then((res)=>res.json()).then(()=>{
    });
    
  }
  
  render() {
    return (
      <div>
        <input onChange={this.handle} type="file" />
      </div>
    );
  }

}

export default UploadFile;
