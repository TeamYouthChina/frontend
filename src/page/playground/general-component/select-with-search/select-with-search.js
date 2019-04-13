import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from 'mdbreact';

const selectWithSearch = props => {

  let options = props.items.map((e,i)=>(
    <MDBSelectOption key={i} value={e.value}>{e.text}</MDBSelectOption>
  ));
  return (
    <div>
      <MDBSelect getValue={props.handleSelectChange}>
        <MDBSelectInput selected={props.title} />
        <MDBSelectOptions search searchLabel='搜索'>
          {/* <MDBSelectOption value="1">USA</MDBSelectOption>
          <MDBSelectOption value="2">Germany</MDBSelectOption>
          <MDBSelectOption value="3">France</MDBSelectOption>
          <MDBSelectOption value="3">Poland</MDBSelectOption>
          <MDBSelectOption value="3">Japan</MDBSelectOption> */}
          {options}
        </MDBSelectOptions>
      </MDBSelect>
      <label>Example label</label>
    </div>
  );
};

selectWithSearch.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
  handleSelectChange: PropTypes.func
};

export default selectWithSearch;
