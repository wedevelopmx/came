import React, { Component } from 'react';

navigator.getUserMedia = ( navigator.getUserMedia ||
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);


const Camera = (props) => (
  <div style={props.style}>
    <div className="frame fm-lg">
      <video id="video" className="picture"></video>
    </div>
    <a className="md-btn md-raised md-fab md-mini m-r pos-rlt md-fab-offset pull-right red"
      onClick={ props.handleStartClick }>
      <i className="material-icons md-24">add</i>
    </a>
  </div>
);

const Photo = (props) => (
  <div style={props.style}>
    <div className="frame fm-lg">
      <img id="photo" className="picture" alt="Your photo"/>
    </div>
    <a id="saveButton" className="md-btn md-raised md-fab md-mini m-r pos-rlt md-fab-offset pull-right red"
      onClick={ props.handleResetClick }>
      <i className="material-icons md-24">camera_alt</i>
    </a>
  </div>
);


class WebCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
        constraints: { audio: false, video: { width: 320, height: 240 }},
      camera: 1
    };

    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.enableCamera = this.enableCamera.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
  }

  enableCamera(){
    const constraints = this.state.constraints;
    const getUserMedia = (params) => (
      new Promise((successCallback, errorCallback) => {
        navigator.getUserMedia.call(navigator, params, successCallback, errorCallback);
      })
    );

    getUserMedia(constraints)
    .then((stream) => {
      const video = document.querySelector('video');
      const vendorURL = window.URL || window.webkitURL;

      video.src = vendorURL.createObjectURL(stream);
      video.play();

      this.setState({
        vid: video,
        localstream: stream
      });
    })
    .catch((err) => {
      console.log(err);
    });

    this.setState({ camera: 2 });
    this.clearPhoto();
  }

  disableCamera() {
    if(this.state.vid) {
      this.state.vid.pause();
      this.state.vid.src = "";
    }
    if(this.state.localstream)
      this.state.localstream.stop();
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePicture();
    this.disableCamera();
  }

  handleResetClick(event) {
    event.preventDefault();
    this.setState({ camera: 2 });
    this.enableCamera();
  }

  takePicture() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const video = document.querySelector('video');
    const photo = document.getElementById('photo');
    const { width, height } = this.state.constraints.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
    this.props.updatePicture(data);
    this.setState({ camera: 3 });
  }


  render() {
    let camera = (
      <div>Loading...</div>
    );

    const hidden = { display: 'none' };
    const show = { display: 'block' };

    switch (this.state.camera) {
      // Show blue screen with camera button
      case 1:
        camera = (
          <div className="p-a-lg pos-rlt text-center">
            <span className="circle-icon img-circle white" onClick={this.enableCamera}>
              <i className="material-icons md-48 text-blue">&#xe8fc;</i>
            </span>
            <span className="p-t text-muted text-white block">Presiona para activar camara</span>
          </div>
        );
        break;
      case 2:
        // Turn on camera
        camera = (
          <div className="p-a-lg pos-rlt text-center">
            <Camera handleStartClick={ this.handleStartClick } style={show}/>
            <Photo style={hidden}/>
          </div>
        );
        break;
      case 3:
        // Show picture taken
        camera = (
          <div className="p-a-lg pos-rlt text-center">
            <Camera handleStartClick={ this.handleStartClick } style={hidden}/>
            <Photo style={show} handleResetClick={ this.handleResetClick } />
          </div>
        );
        break;
    }

    return (
      <div className="item">
        <div className="item-bg blue">
        </div>
        {camera}
        <canvas id="canvas" hidden></canvas>
        { this.props.children }
      </div>
    );
  }
}

export default WebCamera;
