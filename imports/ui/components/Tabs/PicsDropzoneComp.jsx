import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ClientPictures from '../../../api/client_pictures/collection'

export default class ClientPicsComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accepted: [],
      rejected: [],
      imageDisplay: '',
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //
  // }
  componentDidMount() {
    const imageDisplay = ClientPictures.findOne();
    console.log('imageDisplay:', imageDisplay);
    this.setState({
      imageDisplay,
    })
  }

  handleDrop(accepted, rejected) {
    console.log('ACCEPTED pic:', accepted);
    console.log('REJECTED pic:', rejected);
    this.setState({
      accepted,
      rejected,
    });
    // FS.Utility.eachFile(accepted, function(file) {
    ClientPictures.insert(accepted[0], (err, fileObj) => {
      if (err) {
        console.log('handleDrop ERR:', err);
      } else {
        console.log('handleDrop fileObj:', fileObj);
        this.setState({
          imageDisplay: '',
        })
      }
      // });
    });
  }

  render() {
    let dropzoneHeader = '';
    const dropzoneText = 'Click to select photo or drop here.';
    if (this.props.picType === 'before') {
      dropzoneHeader = 'Before';
    } else if (this.props.picType === 'before') {
      dropzoneHeader = 'After';
    }
    return (
      <div id="pics-dropzone-comp">
        <section>
          <div className="dropzone">
            <h2>{dropzoneHeader}</h2>
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={this.handleDrop}
            >
              <p>{dropzoneText}</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Accepted files</h2>
            <ul>
              {
                this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
            <h2>Rejected files</h2>
            <ul>
              {
                this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
        <div>
          {this.state.imageDisplay ? <img src={this.state.imageDisplay.url} alt="thumbnail" /> : null}
        </div>
      </div>
    );
  }
}
