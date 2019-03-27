import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './picture.css';
import {languageHelper} from '../../../../tool/language-helper';
import {MDBRow, MDBCol} from 'mdbreact';
import Lightbox from 'react-image-lightbox';

class LightBoxReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: [
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg',
        'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg'
      ]
    };
    // i18n
    this.text = LightBoxReact.i18n[languageHelper()];
    // style
  }
  renderImages = () => {
    let photoIndex = -1;
    const { images } = this.state;

    return images.map(imageSrc => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol size="4" key={photoIndex}>
          <figure>
            <img src={imageSrc} alt="Gallery" className="img-fluid" onClick={()=>
              this.setState({ photoIndex: privateKey, isOpen: true })
            }
            />
          </figure>
        </MDBCol>
      );
    });
  }
  render() {
    const { photoIndex, isOpen, images } = this.state;
    return (
      <div style={{width:'60.17vw'}}>
        <div className="mdb-lightbox no-margin">
          <MDBRow>
            {this.renderImages()}
          </MDBRow>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            imageTitle={photoIndex + 1 + '/' + images.length}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })
            }
          />
        )}
      </div>

      
    );
  }
}

LightBoxReact.i18n = [
  {},
  {}
];

LightBoxReact.propTypes = {
  // self
  align: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  intervalVw: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const LightBox = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(LightBoxReact));
