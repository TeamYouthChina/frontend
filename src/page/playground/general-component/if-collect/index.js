import React from 'react';
import PropTypes from 'prop-types';
import none from './false.png';
import collected from './true.png';
import {put,deleteHttp} from '../../../../tool/api-helper';



export class IfCollect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collect: null
    };
  }
  async componentDidMount() {
    if (this.props.ifcollect) {
      this.setState({
        collect: this.props.ifcollect
      });
    }
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
            zIndex:'300'
          }}
          className="ml-3"
         
          onClick={()=>{
            /*
            * type:
            * 1: Job
            * 2: Company
            * 3: Question
            * 4: Review
            * 5: Article
            */
            if (this.props.type === 1 && this.props.ifcollect===false){
              put(`/jobs/${this.props.id}/attention`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 1 && this.props.ifcollect===true){
              deleteHttp(`/jobs/attentions/${this.props.id}`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 2 && this.props.ifcollect===false){
              put(`/companies/${this.props.id}/attention`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 2 && this.props.ifcollect===true){
              deleteHttp(`/companies/attentions/${this.props.id}`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 3 && this.props.ifcollect===false){
              put(`/questions/${this.props.id}/attention`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 3 && this.props.ifcollect===true){
              deleteHttp(`/questions/attentions/${this.props.id}`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 4 && this.props.ifcollect===false){
              put(`/editorials/${this.props.id}/attention`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 4 && this.props.ifcollect===true){
              deleteHttp(`/editorials/attentions/${this.props.id}`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 5 && this.props.ifcollect===false){
              put(`/articles/${this.props.id}/attention`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
            if (this.props.type === 5 && this.props.ifcollect===true){
              deleteHttp(`/articles/attentions/${this.props.id}`).then(()=>{
                this.setState({
                  collect:!this.state.collect
                });
              });
            }
          }}
        >

          {this.state.collect?
            (<div className="d-flex align-items-center" style={{cursor:'pointer'}}>

              <div>
                <img src={collected} className="p-0 mr-2"/>
              </div>
              <div>取消</div>

            </div>):
            (<div className="d-flex align-items-center" style={{cursor:'pointer'}}>

              <div>
                <img src={none}className="p-0 mr-2"/>
              </div>
              <div>收藏</div>

            </div>)
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
