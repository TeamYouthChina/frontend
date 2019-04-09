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
import {withRouter} from 'react-router-dom';


/*
   导入自定义模块：
   - 排列规则同上。
   - 自定义模块和第三方模块之间应当空一行。
*/

import classes from './index.module.css';

import {languageHelper} from '../../../../tool/language-helper';

import {mockGetAsync} from '../../../../tool/api-helper';
import {content} from './index.mock.js';




class ReviewCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content: {
          id: null,
          creator: {
            id: null,
            username: null,
            role: null
          },
          title: null,
          answer: null,

        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = ReviewCardSquareReact.i18n[languageHelper()];
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
        <div className={classes.logo}>“</div>
        <div className={classes.note}>{this.state.backend.content.answer}</div>
        <div className="d-flex align-items-center mt-2">
          <div className={classes.avatar}>
            <img
              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
              className="rounded-circle img-fluid p-0 float-right"
            />
          </div>
          <div className={classes.people}>{this.state.backend.content.creator.username}</div>
          <div className={classes.tag}><div className="px-2">{this.state.backend.content.creator.role}</div></div>
        </div>
      </div>

    );
  }
}

ReviewCardSquareReact.i18n = [
  {},
  {}
];

ReviewCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

/* 模块命名：你的命名被用在这里 */

export const ReviewCardSquare = withRouter(ReviewCardSquareReact);

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
