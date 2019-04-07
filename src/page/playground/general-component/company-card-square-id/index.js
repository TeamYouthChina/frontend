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

import classes from './index.module.css';
import {IfCollect} from '../if-collect';
/*
   导入自定义模块：
   - 排列规则同上。
   - 自定义模块和第三方模块之间应当空一行。
*/

import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';
import {content} from './index.mock';

/* 模块命名：在你的命名后面追加 React */

class CompanyCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content: {
          id: null,
          name: null,
          avatarUrl: null,
          location: null,
          website: null,
          employee:null,
          
          note: null,
          nation: null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = CompanyCardSquareReact.i18n[languageHelper()];
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
        <div className={classes.logo}>
          <img
            src={this.state.backend.content.avatarUrl}
            className="img-fluid p-0 float-right"
          />
        </div>
        <div className={classes.title}>
          {this.state.backend.content.name}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className={classes.note}>
            {this.state.backend.content.employee}
          </div>
          <div className={classes.note}>
            <IfCollect/>
          </div>
        </div>
      </div>
    );
  }
}

CompanyCardSquareReact.i18n = [
  {},
  {}
];

CompanyCardSquareReact.propTypes = {
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

export const CompanyCardSquare = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CompanyCardSquareReact));

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
