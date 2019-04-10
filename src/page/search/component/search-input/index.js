import React from 'react';
import Proptypes from 'prop-types';
import classes from './index.module.css';

export const SearchInput = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <input
        name="keyword"
        type="text"
        value={props.keyword}
        className={`flex-fill p-0 form-control ${classes.searchInput}`}
        placeholder="通过以下方式搜索"
        onChange={props.onChange}
      />
      {/*<button type="submit">submit</button>*/}
    </form>
  );
};

SearchInput.propTypes = {
  keyword: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired
};
