import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {getAsync} from '../../../tool/api-helper';

class EstablishReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = EstablishReact.i18n[languageHelper()];
  }
  async componentDidMount() {

    this.setState({
      backend: await getAsync('/my?type=company')
    });
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall" 
        >
          <div
            className="cell-membrane d-flex justify-content-center"
          >
           

          </div>
        </div>
      </div>
    );
  }
}

EstablishReact.i18n = [
  {},
  {}
];

EstablishReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Establish = EstablishReact;
