import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import more from './more.png';
import {languageHelper} from '../../../../tool/language-helper';
import {Link, withRouter} from 'react-router-dom';
import {get} from '../../../../tool/api-helper';

class CreationCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null
    };
    // i18n
    this.text = CreationCardReact.i18n[languageHelper()];
  }

  componentDidMount() {
    get(`/users/${window.localStorage.id}/my?type=${this.props.type}`).then((data) => {
      if (data.status.code === 2000) {
        this.setState(() => ({
          backend: data.content
        }));
      } else {
        this.props.history.push('/page-no-found');
      }
    });
  }

  render() {
    const backend = this.state.backend;
    return (
      <Link
        className={classes.content}
        to={{
          pathname: `/my/collection/${this.props.url}`,
        }}
      >
        <div className={classes.bg}>
          <img
            src={this.props.logo}
            className="justify-content-center align-self-center"
            style={{verticalAlign: 'center', padding: '1.17vw 0'}}
            alt={'logo'}
          />
        </div>
        <div style={{width: '31.125vw'}}>
          <div className={classes.name}>
            {this.props.text}
          </div>
          <div className={classes.tag}>
            {backend === null ? '     0' : `    ${backend[this.props.type].data.length}`}{this.props.unit}{this.props.text}
          </div>
        </div>
        <div>
          <img alt={'more'} src={more} style={{marginTop: '-1.1vw'}} />
        </div>
      </Link>
    );
  }
}

CreationCardReact.i18n = [
  {},
  {}

];

CreationCardReact.propTypes = {
  // self
  text: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const CreationCard = withRouter(CreationCardReact);

