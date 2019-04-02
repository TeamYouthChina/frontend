/* 区块注释的内容应当删去 */

/*
   导入第三方模块：
   - 将 `import React from 'react';` 放在首位。
   - 将 `import * as ... from '...';` 放在最后。
   - 将其他模块按照 `import` 后的首个单词的字母表顺序排列。所有大写字母开头的全部放到小写字母开头的前面。
   - 一行 `import` 导入多个模块的，模块按照字母表顺序排列，规则同上。
   - 这样做的目的是：保持部分代码有序，减少发生冲突的可能性。
*/

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

/*
   导入自定义模块：
   - 排列规则同上。
   - 自定义模块和第三方模块之间应当空一行。
*/

import classes from './index.module.css';
import more from './more.png';
import {IfCollect} from '../if-collect';

import {languageHelper} from '../../../../tool/language-helper';

import {mockGetAsync} from '../../../../tool/api-helper';
import {content} from './index.mock';

/* 模块命名：在你的命名后面追加 React */

class JobCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content:{
          id: null,
          name: null,
          organization:{
            id:null,
            name:null,
            avatarUrl: null,
            location: null,
            note: null
          },

          location: null,
          deadLine:null,
          range:null,
          salary:null,
          worktime:null,
          type:null,
          job_description:
            null,
          job_duty:
            null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = JobCardSquareReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, backend: requestedData});
  }
  render() {



    return (
      <div className={classes.content}>
        <div className="d-flex justify-content-between">
          <div className={classes.logo}>
            <img
              src={this.state.backend.content.organization.avatarUrl}
              className="img-fluid p-0 float-right"
            />
          </div>
          <div>
            <img
              src={more}
            />
          </div>
        </div>
        <div className={classes.title}>{this.state.backend.content.name}</div>
        <div className={classes.company}>{this.state.backend.content.organization.name}</div>
        <div className={classes.location}>{this.state.backend.content.location}</div>
        <div className="d-flex justify-content-between">
          <div className={classes.ddl}>{this.state.backend.content.deadLine}</div>
          <div className={classes.ddl}> <IfCollect/></div>
         
        </div>
       
        
      </div>
    );
  }
}

JobCardSquareReact.i18n = [
  {},
  {}
];

JobCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

/* 模块命名：你的命名被用在这里 */

export const JobCardSquare = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(JobCardSquareReact));

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
