import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import more from './more.png';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter, Link} from 'react-router-dom';
import {generateHeaders, urlPrefix} from '../../../../tool/api-helper';


class CollectionCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null
    };
    // i18n
    this.text = CollectionCardReact.i18n[languageHelper()];
  }

  componentDidMount() {
    this.fetchData();
  }
  
  fetchData = () => {
    try{
      fetch(
        `${urlPrefix}/users/${window.localStorage.id}/attentions?type=${this.props.type}`,
        {
          method:'GET',
          headers:generateHeaders(),
          body:null
        }
      ).then((res)=>(
        res.json()
      )).then((res)=>{
        if(res.status.code === 2000){
          this.setState(()=>({
            backend:res.content
          }));
        } else {
          this.props.history.push('/page-no-found');
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  // 不知道为什么render四次...
  render() {
    const backend = this.state.backend;
    return (
      <Link 
        className={classes.content}
        to={{
          pathname:`/my/collection/${this.props.url}`,
        }}
      >
        <div className={classes.bg}>
          <img
            src={this.props.logo}
            className="justify-content-center align-self-center"
            style={{verticalAlign:'center',padding:'1.17vw 0'}}
            alt={'logo'}
          />
        </div>
        <div style={{width:'31.125vw'}}>
          <div className={classes.name}>
            {this.props.text}
          </div>
          <div className={classes.tag}>
            您关注的{this.props.text}数
            {backend === null ? '     0' : `    ${backend[this.props.type].data.length}`}
          </div>
        </div>
        <div>
          <img alt={'more'} src={more} style={{marginTop:'-1.1vw'}}/>
        </div>
      </Link>
    );
  }
}

CollectionCardReact.i18n = [
  {},
  {}
  
];

CollectionCardReact.propTypes = {
  // self
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const CollectionCard = withRouter(CollectionCardReact);

