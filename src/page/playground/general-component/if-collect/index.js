import React from 'react';
import PropTypes from 'prop-types';
import none from './false.png';
import collected from './true.png';
//import {getAsync, put} from '../../../../tool/api-helper';



export class IfCollect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collect: false
    };

    if (this.props.ifcollect === true) {
      this.setState({
        collect: true
      });
    }
  }
  /*async componentDidMount() {
    if (this.props.type === 1&& this.state.collect===true) {
      put(`/jobs/${this.props.id}/attention`, '').then();
    }
    if (this.props.type === 1&& this.state.collect===false) {
      put(`/jobs/${this.props.id}/attention`, '').then();
    }
    if (this.props.type === 2) {

    }
  }*/

  isCollect = ()=>{
    this.setState({
      collect: !this.state.collect
    });
  }

  render() {
    
    return  (
      <div>
        <div
          style={{
            fontFamily: 'PingFang SC',
            lineHeight: 'normal',
            fontSize: '0.875rem',
            color: '#8D9AAF',
          }}
          className="ml-3"
         
          onClick={this.isCollect}
        >
          {this.state.collect? (<div className="d-flex align-items-center"><div><img src={collected} className="p-0 mr-2"/></div> <div>取消</div></div>):
            (<div className="d-flex align-items-center"><div><img src={none}className="p-0 mr-2"/></div><div>收藏</div></div>)
          }
        </div>
      </div>
    ) ;


  }
}

IfCollect.propTypes = {
  //self
  ifcollect:PropTypes.bool.isRequired,
  type:PropTypes.bool.isRequired,
  id:PropTypes.bool.isRequired,
};
