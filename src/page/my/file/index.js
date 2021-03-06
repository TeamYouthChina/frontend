import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {Redirect} from 'react-router-dom';
import {FileGeneralCard} from './card/general-card';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {get, isLogin} from '../../../tool/api-helper';

class FileReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      //todo, 电子简历没有获取
      pdf: null,
      render:0
    };
    // i18n
    this.text = FileReact.i18n[languageHelper()];
  }

  componentDidMount() {
    if (isLogin()) {
      get('/resumes?type=pdf').then((res) => {
        this.setState(() => ({
          pdf: res,
          render:1,
        }));
      });
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
      case 1:
        return (
          <div style={{background: '#F3F5F7'}}>
            <div
              className="cell-wall"
            >
              <div
                className="cell-membrane"
              >
                <div className={classes.title}>
                  我的简历
                </div>
                {this.state.pdf.status.code=== 4040 ? (
                  <div className="d-flex" style={{marginBottom: '2.03vw'}}>
                    <div style={{marginRight: '1.875vw'}}>
                      <FileGeneralCard
                        jobID={this.props.location.query}
                        text={'PDF简历'}
                        tag={'0份文件'}
                        date={'上次修改时间：2019年3月21'} url={'pdf-resume'} />
                    </div>
                    {/*<div>*/}
                    {/*<FileGeneralCard jobID={this.props.location.query} text={'电子简历'} tag={`${pdfCount}份文件`}*/}
                    {/*date={'上次修改时间：2019年3月21'} url={'e-resume'} />*/}
                    {/*</div>*/}
                  </div>
                ) : (
                  <div className="d-flex" style={{marginBottom: '2.03vw'}}>
                    <div style={{marginRight: '1.875vw'}}>
                      <FileGeneralCard
                        jobID={this.props.location.query}
                        text={'PDF简历'}
                        tag={`${this.state.pdf.content.data.length}份文件`}
                        date={'上次修改时间：2019年3月21'} url={'pdf-resume'} />
                    </div>
                    {/*<div>*/}
                    {/*<FileGeneralCard jobID={this.props.location.query} text={'电子简历'} tag={`${pdfCount}份文件`}*/}
                    {/*date={'上次修改时间：2019年3月21'} url={'e-resume'} />*/}
                    {/*</div>*/}
                  </div>
                )}

                {/*<div className="d-flex" style={{marginBottom: '2.03vw'}}>*/}
                {/*<div style={{marginRight: '1.875vw'}}>*/}
                {/*loading*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*loading*/}
                {/*</div>*/}
                {/*</div>*/}

              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

FileReact.i18n = [
  {},
  {}
];

FileReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const File = FileReact;
