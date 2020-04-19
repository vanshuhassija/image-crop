import React, { Component } from 'react';
import { Image, Button } from 'react-bootstrap';
import './index.scss';

export default class CropImageContainer extends Component {
  constructor() {
    super();
  }

  render() {
    let horizontalURL = localStorage.getItem('horizontalURL');
    let verticalURL = localStorage.getItem('verticalURL');
    let smallURL = localStorage.getItem('smallURL');
    let galleryURL = localStorage.getItem('galleryURL');

    return (
      <div className="m-5 flex flex-row">
        <Image src={horizontalURL} className="cropped-img" />
        <Image src={verticalURL} className="cropped-img ml-5" />
        <Image src={smallURL} className="cropped-img mt-3" />
        <Image src={galleryURL} className="cropped-img mt-4 mx-5" />
        <Button
          onClick={() => {
            localStorage.clear();
            this.props.history.push('/');
          }}
        >
          CROP ANOTHER
        </Button>
      </div>
    );
  }
}
