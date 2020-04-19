import React, { Component } from 'react';

import './index.scss';
import axios from 'axios';
import { Spinner, Toast } from 'react-bootstrap';

export default class ImageUploader extends Component {
  constructor() {
    super();
    this.cropper = React.createRef();
    this.state = {
      showError: false,
    };
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleFileChange = (e) => {
    const fd = new FormData();
    fd.append('file', e.target.files[0], e.target.files[0].name);
    console.log(e.target.files[0].offsetHeight);
    this.setState({
      loading: true,
    });
    axios
      .post('https://divided-wish.000webhostapp.com/api/index.php', fd)
      .then((response) => {
        let { type, message, url } = response.data;
        if (type === 'error') {
          console.log('Message is ', message);
          this.setState({
            showError: true,
            errorMessage: message,
            loading: false,
          });
        } else if (type === 'success') {
          this.setState(
            {
              loading: false,
            },
            () => {
              this.props.history.push(`/crop/horizontal`);
              localStorage.setItem('imageURL', url);
            }
          );
        }
      });
  };

  // If you setState the crop in here you should return false.

  render() {
    const { loading, showError, errorMessage } = this.state;
    return (
      <div className="App">
        {loading ? (
          <Spinner animation="grow" variant="primary" className="mt-5" />
        ) : (
          <div>
            <div class="frame">
              <div class="center">
                <div class="title">
                  <h3>Drop file to upload</h3>
                </div>

                <div class="dropzone">
                  <img
                    src="http://100dayscss.com/codepen/upload.svg"
                    class="upload-icon"
                  />
                  <input
                    type="file"
                    class="upload-input"
                    onClick={this.handleClick}
                    onChange={this.handleFileChange}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <Toast
              show={showError}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '	rgb(255,0,0,0.9)',
              }}
              onClose={() => {
                this.setState({
                  showError: false,
                });
              }}
            >
              <Toast.Header>
                <strong className="mr-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>{errorMessage}</Toast.Body>
            </Toast>
          </div>
        )}
      </div>
    );
  }
}
