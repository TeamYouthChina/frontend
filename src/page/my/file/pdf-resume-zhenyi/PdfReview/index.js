import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

//import { Page, Text, View, Document, StyleSheet,PDFViewer } from '@react-pdf/renderer';
import { Document, Page } from 'react-pdf';


import {languageHelper} from '../../../../../tool/language-helper';
//import pdf from './sample.pdf';
class PdfReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      numPages: null, pageNumber: 1
    };
    // i18n
    this.text = PdfReviewReact.i18n[languageHelper()];
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));


  // onDocumentLoadSuccess = ({ numPages }) => {
  //   this.setState({ numPages });
  // }

  render() {
    const { pageNumber, numPages } = this.state;
    //const path = '/sample.pdf';
   
    return (
      <div>
        <nav>
          <button onClick={this.goToPrevPage}>Prev</button>
          <button onClick={this.goToNextPage}>Next</button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="/sample.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={1} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

PdfReviewReact.i18n = [
  {},
  {}
];

PdfReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const PdfReview = withRouter(PdfReviewReact);
