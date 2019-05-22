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
  onDocumentLoadSuccess = ({ numPages }) => {//numPages是总页数
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
    // const { pageNumber, numPages } = this.state;
    //const path = '/sample.pdf';
   
    return (
      <div>
        <object 
          style={{width:'50vw',height:'70vw'}}
          data="http://youthchina-static-file.oss-us-west-1.aliyuncs.com/2886160364108517376?Expires=1558403639&OSSAccessKeyId=LTAId2jIl3ln6iIe&Signature=V2r6TJU%2FrfGLcfccxtoXXU%2F%2FATY%3D" 
          type="application/pdf"
        >
          <embed src="http://youthchina-static-file.oss-us-west-1.aliyuncs.com/2886160364108517376?Expires=1558403639&OSSAccessKeyId=LTAId2jIl3ln6iIe&Signature=V2r6TJU%2FrfGLcfccxtoXXU%2F%2FATY%3D" type="application/pdf" />
        </object>
        <Document
          file="http://youthchina-static-file.oss-us-west-1.aliyuncs.com/2886160364108517376?Expires=1558403639&OSSAccessKeyId=LTAId2jIl3ln6iIe&Signature=V2r6TJU%2FrfGLcfccxtoXXU%2F%2FATY%3D"//文档地址
          loading=""
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page
            key={this.state.currentPage}
            pageNumber={this.state.currentPage} //当前页页码
            width={850}
          />
        </Document>
        
        {/*<nav>*/}
        {/*<button onClick={this.goToPrevPage}>Prev</button>*/}
        {/*<button onClick={this.goToNextPage}>Next</button>*/}
        {/*</nav>*/}
        
        {/*<div style={{ width: 600 }}>*/}
        {/*<Document*/}
        {/*file="http://youthchina-static-file.oss-us-west-1.aliyuncs.com/2886160364108517376?Expires=1558403639&OSSAccessKeyId=LTAId2jIl3ln6iIe&Signature=V2r6TJU%2FrfGLcfccxtoXXU%2F%2FATY%3D"*/}
        {/*onLoadSuccess={this.onDocumentLoadSuccess}*/}
        {/*>*/}
        {/*<Page pageNumber={1} width={600} />*/}
        {/*</Document>*/}
        {/*</div>*/}
        
        {/*<p>*/}
        {/*Page {pageNumber} of {numPages}*/}
        {/*</p>*/}
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
