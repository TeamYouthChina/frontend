import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {MDBIcon, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter} from 'mdbreact';
import {Select} from 'antd';
import {Tag} from './tag';
import {TagModal} from './tagModal';
// import {post} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';
import {getAsync, isLogin} from '../../../../tool/api-helper';

class AdvantageTagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1: false,
      backend: null,
      length:null,
      render: 0,
      value: '搜索我的标签',
      select: [],
      select_code: [],
      finishtag: false,
    };
    // i18n
    this.text = AdvantageTagReact.i18n[languageHelper()];
    this.select_code = [];
    this.dic = [];
    // style
  }

  async componentDidMount() {
    if (!isLogin()) {
      this.props.history.push('/login');
    }
    // const Option = Select.Option;
    // let tag=await getAsync(`/static/dictionaries?type=label`)
    // let children = [];
    // tag.content.map((item,index)=>{
    //   children.push(<Option key={item.name} value={item.name}>{item.name}</Option>);
    // });
    let tag = await getAsync('/static/dictionaries?type=label');
    tag.content.map((item) => {
      this.dic.push(item.name);
    });
    let backend;
    if(this.props.id !== undefined){
      backend = await getAsync(`/labels/${this.props.type}/${this.props.id}`);
      backend = backend.content;
      let length = backend.length;
      let select = [];
      let tmp = [];
      for(let i=0; i < backend.length;i++){
        const data = {
          id:backend[i].label_code,
          name:backend[i].label_chn,
          status:'POST',
        };
        select.push(data);
        const data2 = {
          id:backend[i].label_code,
          name:backend[i].label_chn,
          status:'POST',
        };
        tmp.push(data2);
      }
      // 初始化选择的和原来的label
      this.props.tellLabel(length,select, tmp);
      this.setState(()=>({
        select,
        length
      }));
    } else {
      backend = [];
      this.props.tellLabel(0, [], []);
    }
    
    this.setState({
      render: 1,
      backend,
      tag: tag,
      //children:children
    });
  }
  // 开始添加
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };
  
  // 添加label
  handleChange = (value) => {
    if(value !== void 0) {
      let select = this.state.select;
      let code = this.dic.indexOf(value) + 1;
      let length = this.state.length + 1;
      const data = {
        id:code,
        name:value,
        status:'POST',
      };
      select.push(data);
      this.props.tellLabel(length,select);
      this.setState({
        value: value,
        select,
        length,
        //select:this.state.select.concat([value])
      });
    } else {
      this.setState({
        value,
      });
    } 
  };
  // 删除label
  onDeleteLabel = (index) => {
    let length = this.state.length - 1;
    let data = this.state.select;
    data[index].status = 'DELETE';
    this.props.tellLabel(length, data);
    this.setState(()=>({
      select:data,
      length
    }));
  };
  
  onFresh = async () => {
    this.setState({
      backend: await getAsync(`/labels/${this.props.type}/${this.props.id}`),
    });
  };

  render() {
    const { select, length} = this.state;
    switch (this.state.render) {
      case 1:
        return (
          <div>
            <div className={classes.content}>
              {
                select.length === 0 ? (
                  <div className={classes.addContainer}>
                    <div
                      className={classes.type1}
                      style={{width: '5vw'}}
                      onClick={this.toggle(1)}
                    >
                      <MDBIcon icon="plus" />
                    </div>
                    <div className={classes.notag}>
                      添加我的标签
                    </div>
                  </div>

                ) : (
                  <div className="d-flex justify-content-start">
                    <div
                      className={classes.type1}
                      //onClick={this.toggle(1)}
                      onClick={() => {
                        this.select = [];
                        this.setState({
                          modal1: true
                        });
                      }}
                    >
                      <MDBIcon icon="plus" />
                    </div>
                    {select.map((item, index) => {
                      return (
                        <div className="d-flex justify-content-start" key={index}>
                          {item.status === 'POST' && (
                            <Tag
                              fresh={this.onFresh}
                              id={item.id}
                              tag={item.name}
                              label_code={item.label_code}
                              length={length}
                              index={index}
                              onDeleteLabel={this.onDeleteLabel}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )

              }


            </div>
            <MDBModal isOpen={this.state.modal1} size="lg" centered>
              <MDBModalHeader>添加标签</MDBModalHeader>
              <MDBModalBody>
                {/*<div className="mb-3">*/}
                {/*<MDBInput hint="搜索我的标签" type="text" containerClass="mt-0 mx-2" />*/}
                {/*</div>*/}
                <div className="mb-3">
                  <Select
                    tags
                    showSearch
                    allowClear={true}
                    style={{width: '100%'}}
                    searchPlaceholder="标签模式"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    {
                      this.state.tag.content.map((item) => {
                        return (
                          <Select.Option key={item.name}>{item.name}</Select.Option>
                        );
                      })
                    }

                    {/*{this.state.children}*/}
                  </Select>
                </div>
                <div className="d-flex flex-wrap justify-content-start">
                  {
                    select.map((item, index) => item.status === 'POST' && <TagModal key={index} tag={item.name} />)
                  }
                </div>

              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle(1)}>关闭</MDBBtn>
                <MDBBtn
                  color="primary"
                  onClick={this.toggle(1)}
                  // for (let i = 0; i < this.select_code.length; i += 1) {
                  //   post(
                  //     '/labels',
                  //     {label_code: this.select_code[i], target_id: localStorage.getItem('id'), target_type: 100}
                  //   ).then(async () => {
                  //     this.setState({
                  //       backend: await getAsync(`/labels/100/${localStorage.getItem('id')}`),
                  //     });
                  //   });
                  // }
                  // this.select_code.map(async (item)=>{
                  //   await postAsync(
                  //     '/labels', 
                  //     {label_code:item,target_id:localStorage.getItem('id'),target_type:100}
                  //   );
                  //    
                  // });
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
  id: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
  tellLabel: PropTypes.func.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const AdvantageTag = withRouter(AdvantageTagReact);
