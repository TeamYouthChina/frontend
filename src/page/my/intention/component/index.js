import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {MDBIcon,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import { Select } from 'antd';
import {Tag} from './tag';
import {get, post} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';
import {getAsync, isLogin} from '../../../../tool/api-helper';

class AdvantageTagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1:false,
      backend:null,
      render:0,
      value:'搜索我的标签',
      select:[],
      finishtag:false
    };
    // i18n
    this.text = AdvantageTagReact.i18n[languageHelper()];
    this.select=[];
    // style
  }
  async componentDidMount(){
    if(!isLogin()){
      this.props.history.push('/login');
    }
    // const Option = Select.Option;
    // let tag=await getAsync(`/static/dictionaries?type=label`)
    // let children = [];
    // tag.content.map((item,index)=>{
    //   children.push(<Option key={item.name} value={item.name}>{item.name}</Option>);
    // });
    this.setState({
      render:1,
      backend:await getAsync(`labels/${localStorage.getItem('id')}`),
      tag:await getAsync('/static/dictionaries?type=label'),
      //children:children
    });

  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }
  
  handleChange=(value)=> {
    this.select.push(value);
    this.setState({
      value: value,
      select:this.select
      //select:this.state.select.concat([value])

    });
    // this.setState((prevState)=>({
    //   select: [...prevState.select,value],
    //   value: value,
    // }));
    
   
  }
  submit=(body)=>{
    post('/labels', body).then((data)=>{
      return(data);
    });
  }
  
  onFresh = () => {
    get(`labels/${localStorage.getItem('id')}`).then((response) => {
      this.setState({
        backend: response
      });
    });
  };
  render() {
    switch (this.state.render) {
      case 1:
        
        
        return (
          <div>
            <div className={classes.content}>
              <p className={classes.name}>
                求职标签
              </p>
              <div className="d-flex justify-content-start">
                <div className={classes.type1} onClick={this.toggle(1)}>
                  <MDBIcon icon="plus" />
                </div>
                {
                  this.state.backend?(
                    <div className={classes.notag}>
                      添加我的标签
                    </div>
                  ):(
                    this.state.backend.content.data.map((item,index)=>{
                      return(
                        <Tag
                          key={index}
                          fresh={this.onFresh}
                          id={item.label_id}
                          tag={item.label_code}/>
                      );
                    })
                  )
                  
                }

              </div>
            </div>
            <MDBModal isOpen={this.state.modal1}  size="lg" centered>
              <MDBModalHeader >添加标签</MDBModalHeader>
              <MDBModalBody>
                {/*<div className="mb-3">*/}
                {/*<MDBInput hint="搜索我的标签" type="text" containerClass="mt-0 mx-2" />*/}
                {/*</div>*/}
                <div className="mb-3">
                  <Select
                    tags
                    showSearch
                    style={{ width: '100%' }}
                    searchPlaceholder="标签模式"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    {
                      this.state.tag.content.map((item)=>{
                        return(
                          <Select.Option key={item.name}>{item.name}</Select.Option>
                        );
                      })
                    }
                    
                    {/*{this.state.children}*/}
                  </Select>
                </div>
                <div className="d-flex justify-content-start">
                  {
                    this.state.select.map((item,index)=>{
                      return(
                        <Tag key={index} tag={item} submit={this.submit} isFinish={this.state.finishtag}/>
                      );
                    })
                  }
                </div>

              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle(1)}>关闭</MDBBtn>
                <MDBBtn 
                  color="primary"
                  onClick={()=>{
                    this.setState({
                      finishtag:true
                    });
                  }}
                >
                  保存
                </MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </div>
        );
      default:
        return null;
    }
  }
}

AdvantageTagReact.i18n = [
  {},
  {}
];

AdvantageTagReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const AdvantageTag = withRouter(AdvantageTagReact);
