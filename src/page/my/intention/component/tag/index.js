import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {MDBIcon} from 'mdbreact';

import classes from './index.module.css';
import {languageHelper} from '../../../../../tool/language-helper';
import {deleteHttp} from '../../../../../tool/api-helper';

class TagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:false
    };
    // i18n
    this.text = TagReact.i18n[languageHelper()];
    // style
    
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseEnter(){
    this.setState({
      hover: true,
    });
  }

  onMouseLeave(){
    this.setState({
      hover: false,
    });
  }
  
  render() {
    if(this.props.isFinish){
      let body={
        label_code:this.props.tag,
        target_id:100,
        target_type:100
      };
      this.props.submit(body);
    }
    return (
      <div
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.hover?(
          <div className={`${classes.type2} d-flex` }>
            <div className="mr-2">
              {this.props.tag}
            </div>
            <div>
              <MDBIcon  
                icon="times"
                onClick={()=>{
                  deleteHttp(`/labels/${this.props.tag}/100/${this.props.id}`).then(()=>{
                    
                    this.props.onFresh();

                  });}
                }
              />
            </div>
          </div>
        ):(
          <div className={classes.type1}>
            {this.props.tag}
          </div>
        )}
        
      </div>
    );
  }
}

TagReact.i18n = [
  {},
  {}
];

TagReact.propTypes = {
  // self
  id:PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  isFinish:PropTypes.bool.isRequired,
  onFresh:PropTypes.func.isRequired,
  submit:PropTypes.func.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Tag = withRouter(TagReact);
