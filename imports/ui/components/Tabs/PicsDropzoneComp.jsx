import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
// import ClientPictures from '../../../api/client_pictures/collection'
import ClientBefAftPictures from '../../../api/client_bef_aft_pictures/collection';

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
  // componentDidMount() {
  //   const imageDisplay = ClientPictures.findOne();
  //   console.log('imageDisplay:', imageDisplay);
  //   this.setState({
  //     imageDisplay,
  //   })
  // }

  handleDrop(accepted, rejected) {
    console.log('ACCEPTED pic:', accepted);
    console.log('REJECTED pic:', rejected);
    this.setState({
      accepted,
      rejected,
    });
    let self = this;

    if (accepted && accepted[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = accepted[0];

      if (file) {
        let uploadInstance = ClientBefAftPictures.insert({
          file: file,
          meta: {
            locator: self.props.fileLocator,
            userId: Meteor.userId(), // Optional, used to check on server for file tampering
            clientID: this.props.clientID,
            weightPicType: 'before',
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false)

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        })

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        })

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error)
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
    // FS.Utility.eachFile(accepted, function(file) {
    // ClientPictures.insert(accepted[0], (err, fileObj) => {
    //   if (err) {
    //     console.log('handleDrop ERR:', err);
    //   } else {
    //     console.log('handleDrop fileObj:', fileObj);
    //     this.setState({
    //       imageDisplay: '',
    //     })
    //   }
      // });
    // });
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
          <span><img src={this.props.clientBeforePicPath} alt={this.props.clientBeforePicName} /></span>
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
