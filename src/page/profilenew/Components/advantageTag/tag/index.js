import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
  MDBBtn,
  MDBChip,
} from 'mdbreact';

import classes from './index.module.css';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true,
      tagData: this.props.data // eslint-disable-line
        ? {
          id: this.props.data.id,
          label_code: this.props.data.label_code,
          name: this.props.data.name,
        }
        : {
          id: '',
          label_code: '',
          name: '',
        },
    };
  }
  // editHandler = () => {
  //   this.setState({ editing: true });
  // };

  deleteHandler = () => {
    if (this.state.tagData.id) {
      this.props.deleteHandler(this.state.tagData.id); // eslint-disable-line
    }
    // else {
    //   this.props.cancel();
    // }
  };

  // packup new data for this card and send to parent
  saveHandler = () => {
    this.props.saveHandler(this.state.tagData, null, 'add');
    this.setState({
      ...this.state,
      editing: false,
    });
  };

  cancelHandler = () => {
    this.props.cancel();
    this.setState({
      ...this.state,
      editing: false,
    });
  }

  selectValueOnChange = value => {
    this.setState({
      ...this.state,
      tagData: {
        ...this.state.tagData,
        name: value,
      },
    });
  };

  render() {
    // console.log('tag\'s state')
    // console.log(this.state)
    // console.log('tag\'s props')
    // console.log(this.props)
    let toShow;
    // console.log(this.props.tagNames);
    if (!this.state.editing) {
      toShow = (
        <MDBChip className={classes.Chip} waves close handleClose={this.deleteHandler} size='md'>
          {this.state.tagData.name}
        </MDBChip>
      );
    } else {
      toShow = (
        <div className={classes.AddingCard}>
          <MDBSelect getTextContent={this.selectValueOnChange}>
            <MDBSelectInput selected='优势标签' />
            <MDBSelectOptions search>
              {this.props.tagNames.map(e => {
                if (e.name === this.state.tagData.name) {
                  return (
                    <MDBSelectOption selected key={e.id} value={e.id}>
                      {e.name}
                    </MDBSelectOption>
                  );
                } else {
                  return (
                    <MDBSelectOption key={e.id} value={e.id}>
                      {e.name}
                    </MDBSelectOption>
                  );
                }
              })}
            </MDBSelectOptions>
          </MDBSelect>
          <MDBBtn color='primary' size='lg' onClick={this.saveHandler}>
            保存
          </MDBBtn>
          <MDBBtn color='primary' size='lg' onClick={this.cancelHandler}>
            取消
          </MDBBtn>
        </div>
      );
    }

    return toShow;
  }
}

Tag.propTypes = {
  content: PropTypes.string,
  data: PropTypes.object,
  saveHandler: PropTypes.func,
  tagNames: PropTypes.array,
  cancel: PropTypes.func
};

export default Tag;
