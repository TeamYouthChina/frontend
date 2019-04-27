import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';
import {AnswerCardBarId} from '../../../general-component/answer-card-bar-id';

class CompanyQuestioniReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyQuestioniReact.i18n[languageHelper()];
    // style
  }
  async componentDidMount() {
    this.setState({
      render: 1,
      backend:await getAsync(`/search?type=question&title=${this.props.keyword}&limit=3&page=0`)
    });
  }
  render() {
    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return (
          <div>
            <div className={classes.content}>
              <p className={classes.name}>
                问答
              </p>
              <br/>
              {this.state.backend.content.data.map((item, index) => {
                return (
                  <div style={{marginBottom:'1vw'}} key={index}>
                    <AnswerCardBarId
                      id={item.content.answers[0].id}
                      questionId={item.content.id}
                      questionTitle={item.content.title}
                    />
                    <hr/>
                  </div>
                );
              })}

            </div>
            <div>

            </div>
          </div>
        );
      default:
        return null;
    }
  }
}
CompanyQuestioniReact.i18n = [
  {},
  {}
];

CompanyQuestioniReact.propTypes = {
  // self
  keyword: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyQuestion = withRouter(CompanyQuestioniReact);
