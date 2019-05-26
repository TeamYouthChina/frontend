import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon, MDBRow, MDBAvatar, MDBCol, MDBBtn} from 'mdbreact';

export const VideoInfor = (props) => (
  <React.Fragment>
    <div style={{background: '#FFFFFF', padding: '0.781vw 2.34vw 0 2.34vw', borderRadius: '.156vw'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to={{
          pathname: '/question/0/answer/0',
        }}>
          <strong style={{color: '#31394D', fontSize: '1.4vw', ...props.basicFont}}>{props.title}</strong>
        </Link>
        <MDBIcon style={{justifyContent: 'flex-end'}} icon="ellipsis-h" />
      </div>
      <div>
        <MDBRow style={{margin: '0.781vw 0'}}>
          <MDBAvatar style={{height: '100%', margin: '0.46vw 0.86vw 0.46vw 0'}}>
            <img
              style={{width: '2.5vw', background: '#F4F4F4'}}
              src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
              alt="123"
              className="rounded-circle"
            />
          </MDBAvatar>
          <span style={{
            marginRight: '0.781vw',
            padding: '0.781vw 0',
            color: '#31394D',
            fontSize: '1.09vw', ...props.basicFont
          }}>
            {props.user}
          </span>
          <span style={{
            marginRight: '0.781vw',
            padding: '0.781vw 0',
            color: '#8D9AAF',
            fontSize: '1.09vw', ...props.basicFont
          }}>{props.description}
          </span>
          <span style={{
            padding: '0.781vw 0',
            color: '#8D9AAF',
            fontSize: '1.09vw', ...props.basicFont
          }}>{props.readingTime}次观看
          </span>
        </MDBRow>
        <div style={{color: '#31394D', fontSize: '1.09vw', ...props.basicFont}}>
          {props.short}
        </div>
      </div>
      <MDBRow>
        <MDBCol size="3" style={{padding:'0.781vw 1.17vw'}}>
          <span style={{color: '#8D9AAF', fontSize: '1.09vw', ...props.basicFont,float:'none'}}>
            {props.editTime}
          </span>
        </MDBCol>
        <MDBCol size="9">
          <div style={{float: 'right',marginRight:'-1.17vw'}}>
            <MDBBtn flat style={{padding: '0.391vw 1.56vw', fontSize: '1.09vw', color: '#8D9AAF', ...props.basicFont}}>
              <MDBIcon style={{marginRight: '0.39vw'}} icon="heart"/>收藏
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  </React.Fragment>
);

VideoInfor.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editTime: PropTypes.string.isRequired,
  readingTime: PropTypes.number.isRequired,
  short: PropTypes.string.isRequired,
  
  basicFont: PropTypes.object.isRequired,
};
