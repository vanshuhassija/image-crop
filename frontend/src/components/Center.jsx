import React, { Component } from 'react';

export default class Center extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
