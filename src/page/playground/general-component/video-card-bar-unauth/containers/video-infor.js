import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon, MDBRow, MDBAvatar, MDBCol, MDBBtn} from 'mdbreact';

export const VideoInfor = (props) => (
  <React.Fragment>
    <div style={{background: '#FFFFFF', padding: '20px 30px', borderRadius: '2px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to={{
          pathname: '/question/0/answer/0',
        }}>
          <strong style={{color: '#31394D', fontSize: '18px', ...props.basicFont}}>{props.title}</strong>
        </Link>
        <MDBIcon style={{justifyContent: 'flex-end'}} icon="ellipsis-h" />
      </div>
      <div>
        <MDBRow style={{margin: '10px 0px'}}>
          <MDBAvatar style={{height: '100%', margin: '6px 11px 6px 0px'}}>
            <img
              style={{width: '32px', background: '#F4F4F4'}}
              src={'https://s3.amazonaws.com/youthchina/WechatIMG29.jpeg'}
              alt="123"
              className="rounded-circle"
            />
          </MDBAvatar>
          <span style={{
            marginRight: '10px',
            padding: '10px 0px',
            color: '#31394D',
            fontSize: '14px', ...props.basicFont
          }}>
            {props.user}
          </span>
          <span style={{
            padding: '10px 0px',
            marginRight: '10px',
            color: '#8D9AAF',
            fontSize: '14px', ...props.basicFont
          }}>{props.description}
          </span>
          <span style={{
            padding: '10px 0px',
            color: '#8D9AAF',
            fontSize: '14px', ...props.basicFont
          }}>{props.readingTime}次观看
          </span>
        </MDBRow>
        <div style={{color: '#31394D', fontSize: '14px', ...props.basicFont}}>
          {props.short}
        </div>
      </div>
      <MDBRow>
        <MDBCol size="12" md="3" style={{padding:'10px 15px'}}>
          <span style={{color: '#8D9AAF', fontSize: '14px', ...props.basicFont,float:'none'}}>
            {props.editTime}
          </span>
        </MDBCol>
        <MDBCol size="9">
          <div style={{float: 'right',marginRight:'-15px'}}>
            <MDBBtn flat style={{padding: '5px 10px', fontSize: '14px', color: '#8D9AAF', ...props.basicFont}}>
              <MDBIcon style={{marginRight: '5px'}} icon="heart"/>收藏
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
