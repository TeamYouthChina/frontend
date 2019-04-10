import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import * as deviceHelper from '../../../tool/device-helper';
import {mockGetAsync} from '../../../tool/api-helper';
import {content} from './index.mock';
import {Loading} from './loading';
import {Finish} from './finish';

class ZhichengReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      itemList: [],
      hasMore: true
    };
    // i18n
    this.text = ZhichengReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // 为了确保组件的正常运行，
    // 首次执行 getMore 的时候，
    // 生成的内容必须超过浏览器的视窗高度——必须出现滚动条！
    //
    // issue #47
    // https://github.com/ankeetmaini/react-infinite-scroll-component/issues/47
    await this.getMore();
  }

  getMore = async () => {
    // 从后端获得数据源
    const backend = await mockGetAsync(content);
    this.setState((prevState) => {
      return {
        // 此处是追加，不是替换！
        itemList: prevState.itemList.concat(backend.content.itemList),
        // 理论上 hasMore 与否应当后端提供。这里限定 23 只是为了预览 Finish。
        hasMore: backend.content.hasMore && prevState.itemList.length < 23
      };
    });
  };

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
            className="cell-membrane"
            style={{
              backgroundColor: '#F0F0F0'
            }}
          >
            <div>
              <p>逻辑分辨率：{document.body.clientWidth}px</p>
              <p>
                设备类型：
                {
                  (() => {
                    switch (deviceHelper.getType()) {
                      case deviceHelper.MOBILE:
                        return '移动端';
                      case deviceHelper.DESKTOP:
                        return '桌面端';
                      default:
                        return '';
                    }
                  })()
                }
              </p>
            </div>
            {/* 上面的内容，模拟固定顶部的部分。*/}
            {/* 下面的内容，模拟滚动追加的部分。*/}
            <InfiniteScroll
              dataLength={this.state.itemList.length}
              endMessage={
                // 所有内容加载完成：可以写成组件，也可以直接插入 HTML。
                <Finish />
              }
              hasMore={this.state.hasMore}
              loader={
                // 追加内容加载中：可以写成组件，也可以直接插入 HTML。
                <Loading />
              }
              next={this.getMore}
            >
              {
                // 默认滚动条移动到 80% 处开始触发追加，如需修改使用属性 scrollThreshold。
                // 具体使用参见文档：https://github.com/ankeetmaini/react-infinite-scroll-component
                //
                // 这里是大家非常熟悉的，用 map 放置数组所有元素的方法。
                this.state.itemList.map((item, index) => (
                  <div
                    key={index}
                    style={{marginBottom: '1.5vw'}}
                  >
                    <div
                      style={{
                        backgroundColor: '#A0A0A0',
                        height: '200px'
                      }}
                    >
                      <b>{item.name}</b>
                    </div>
                  </div>
                ))
              }
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

ZhichengReact.i18n = [
  {},
  {}
];

ZhichengReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Zhicheng = ZhichengReact;
