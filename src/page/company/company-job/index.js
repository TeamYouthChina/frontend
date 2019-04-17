import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';
import {CompanyCardBarId} from '../../playground/general-component/company-card-bar-id';

class CompanyJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      compList: []
    };
    // i18n
    this.text = CompanyJobReact.i18n[languageHelper()];
    // style
  }

  async componentDidMount() {
    const result = await this.getData(this.props.id);

    this.setState(() => {
      return {
        compList: result.content.data
      };
    });
    // eslint-disable-next-line
    console.log(this.state.compList);
  }

  getData = async (id) => {
    try {
      const result = await getAsync(`/companies/${id}/jobs`);
      if (result && result.status) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  render() {
    return (
      <div className={classes.content}>
        <p className={classes.name}>在招职位</p>
        <br/>
        {this.state.compList.length !== 0 ?
          (
            this.state.compList.map((item, index) => (
              <CompanyCardBarId key={index} id={item.id}/>
            ))
          )
          : <p className="h3 grey-text">该公司没有别的在招职位</p>
        }
      </div>
    );
  }
}

CompanyJobReact.i18n = [
  {},
  {}
];

CompanyJobReact.propTypes = {
  id: PropTypes.number.isRequired
};

export const CompanyJob = withRouter(CompanyJobReact);
