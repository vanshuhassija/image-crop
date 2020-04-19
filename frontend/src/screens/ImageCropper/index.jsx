import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default class CropImageContainer extends Component {
  constructor() {
    super();
    console.log('Constructor calledd');
  }

  componentDidMount() {
    if (!localStorage.getItem('imageURL')) {
      this.props.history.push('/');
    }
  }

  handleSelection = () => {
    let { position } = this.props.match.params;
    let { history } = this.props;
    let { croppedImageURL } = this.state;
    switch (position) {
      case 'horizontal':
        localStorage.setItem(`${position}URL`, croppedImageURL);

        history.push('/crop/vertical');

        break;

      case 'vertical':
        localStorage.setItem(`${position}URL`, croppedImageURL);

        history.push('/crop/small');

        break;

      case 'small':
        localStorage.setItem(`${position}URL`, croppedImageURL);

        history.push('/crop/gallery');

        break;

      case 'gallery':
        localStorage.setItem(`${position}URL`, croppedImageURL);
        history.push('/image/preview');
    }
  };
  getBoxData = (position) => {
    switch (position) {
      case 'horizontal':
        return {
          width: 755,
          height: 450,
          left: 0,
          top: 0,
        };

      case 'vertical':
        return {
          width: 365,
          height: 450,
          left: 0,
          top: 0,
        };

      case 'small':
        return {
          width: 365,
          height: 212,
          left: 0,
          top: 0,
        };

      case 'gallery':
        return {
          width: 380,
          height: 380,
          left: 0,
          top: 0,
        };
    }
  };

  _crop = () => {
    this.setState({
      croppedImageURL: this.cropper.getCroppedCanvas().toDataURL(),
    });
  };
  render() {
    let { position } = this.props.match.params;
    let boxData = this.getBoxData(position);
    let { width, height } = boxData;
    return (
      <div>
        <Card className="m-5">
          <Card.Title className="mt-3 ml-3">
            Crop Your Image
            <span style={{ color: 'red' }}>
              ({position}: {width}*{height})
            </span>
          </Card.Title>
          <Card.Body className="d-flex flex-direction-row justify-content-between">
            <div>
              <div className="d-flex flex-column mt-4">
                <Button
                  variant="primary"
                  className="b-0"
                  onClick={this.handleSelection}
                >
                  CROP SELECTION
                </Button>
              </div>
            </div>
            <Cropper
              key={position}
              cropBoxResizable={false}
              ref={(cropper) => {
                this.cropper = cropper;
              }}
              src={localStorage.getItem('imageURL')}
              style={{ width: '80%' }}
              ready={() => {
                this.cropper.setCropBoxData(boxData);
              }}
              // Cropper.js options
              dragMode={false}
              guides={true}
              crop={this._crop.bind(this)}
              width={45}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
