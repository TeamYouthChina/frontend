import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';



import classes from './index.module.css';
import {languageHelper} from '../../../../../tool/language-helper';

class TagModalReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:false
    };
    // i18n
    this.text = TagModalReact.i18n[languageHelper()];
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
    // // if(this.props.isFinish){
    // //   let body={
    // //     label_code:this.props.tag,
    // //     target_id:13,
    // //     target_type:100
    // //   };
    // //   this.props.submit(body);
    // }
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

TagModalReact.i18n = [
  {},
  {}
];

TagModalReact.propTypes = {
  // self
  
  tag: PropTypes.string.isRequired,
  //modalDelete:PropTypes.func.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const TagModal = withRouter(TagModalReact);
