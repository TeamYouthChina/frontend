import React from 'react';
import Proptypes from 'prop-types';
import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

class SearchInputReact extends React.Component{
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    // this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          id="searchInput"
          name="keyword"
          type="text"
          value={this.props.keyword}
          className={`flex-fill p-0 form-control ${classes.searchInput}`}
          placeholder="通过以下方式搜索"
          onChange={this.props.onChange}
        />
        {/*<button type="submit">submit</button>*/}
      </form>
    );
  }
}

SearchInputReact.propTypes = {
  keyword: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired
};

export const SearchInput = withRouter(SearchInputReact);
