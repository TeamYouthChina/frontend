import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';

class Header2React extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = Header2React.i18n[languageHelper()];
    // style
    switch (this.props.align) {
      case 'left':
        this.align = {justifyContent: 'flex-start'};
        this.margin = {marginRight: `${this.props.intervalVw}vw`};
        break;
      case 'right':
        this.align = {justifyContent: 'flex-end'};
        this.margin = {marginLeft: `${this.props.intervalVw}vw`};
        break;
      default:
        this.align = {justifyContent: 'center'};
        this.margin = {
          marginLeft: `${this.props.intervalVw / 2}vw`,
          marginRight: `${this.props.intervalVw / 2}vw`
        };
        break;
    }
  }

  render() {
    return (
      <div
        className="cell-wall"
        style={{
          backgroundColor: this.props.backgroundColor
        }}
      >
        <div
          className="cell-membrane"
        >
          <div
            className={classes.content}
            style={this.align}
          >
            {
              this.props.itemList.map((item, index) => {
                return (
                  <div
                    className={this.props.location.pathname.indexOf(item.subPath) > -1 ? classes['interval-selected'] : classes.interval}
                    style={this.margin}
                    key={index}
                  >
                    <Link
                      className={this.props.location.pathname.indexOf(item.subPath) > -1 ? classes['interval-text-selected'] : classes['interval-text']}
                      to={`${this.props.match.url}${item.subPath}`}
                    >
                      {item.name}
                    </Link>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Header2React.i18n = [
  {},
  {}
];

Header2React.propTypes = {
  // self
  align: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  intervalVw: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Header2 = withRouter(Header2React);
