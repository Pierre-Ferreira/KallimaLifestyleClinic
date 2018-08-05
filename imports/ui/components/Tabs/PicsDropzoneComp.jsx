import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ClientBefAftPictures from '../../../api/client_bef_aft_pictures/collection';
import './PicsDropzoneComp.less';

export default class ClientPicsComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      clientBeforePicPath: '',
      clientBeforePicName: '',
      accepted: [],
      rejected: [],
      imageDisplay: '',
      inProgress: false,
      newPictureUploaded: false,
    };
    this.handleDrop = this.handleDrop.bind(this);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //
  // }
  componentDidMount() {
    // Meteor.call('client_picture.fetch', this.props.clientID, this.props.picType, (err, result) => {
    //   if (err) {
    //     this.setState({
    //       feedbackMessage: `ERROR: ${err.reason}`,
    //       feedbackMessageType: 'danger',
    //     });
    //   } else {
    this.setState({
      // clientBeforePicPath: this.props.link(),
      // clientBeforePicName: this.props.name,
      // feedbackMessage: 'Picture downloaded',
      // feedbackMessageType: 'success',
    });
    //   }
    // });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.clientID !== prevProps.clientID ||
      this.state.newPictureUploaded !== prevState.newPictureUploaded
    ) {
      const clientPicturesFile = ClientBefAftPictures.findOne({ $and: [{ 'meta.clientID': this.props.clientID }, { 'meta.weightPicType': this.props.picType }] });
      console.log('clientPicturesFile:', clientPicturesFile)
      if (clientPicturesFile) {
        this.setState({
          clientBeforePicPath: clientPicturesFile.link(),
          clientBeforePicName: clientPicturesFile.name,
          newPictureUploaded: false,
        });
      } else {
        this.setState({
          clientBeforePicPath: '',
          clientBeforePicName: '',
          newPictureUploaded: false,
        });
      }
    }
  }

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
            clientID: self.props.clientID,
            weightPicType: self.props.picType,
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false)

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them,
        // it shows where we are in the process
        uploadInstance.on('start', () => {
          console.log('Starting');
        })

        uploadInstance.on('end', (error, fileObj) => {
          console.log('On end File Object: ', fileObj);
        })

        uploadInstance.on('uploaded', (error, fileObj) => {
          console.log('uploaded: ', fileObj);

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false,
            newPictureUploaded: true,
          });
        })

        uploadInstance.on('error', (error, fileObj) => {
          console.log('Error during upload: ' + error)
        });

        uploadInstance.on('progress', (progress, fileObj) => {
          console.log('Upload Percentage: ' + progress)
          // Update our progress bar
          self.setState({
            progress: progress
          });
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  render() {
    let dropzoneHeader = '';
    const dropzoneText = 'Click to select photo or drop here.';
    if (this.props.picType === 'before') {
      dropzoneHeader = 'Before';
    } else if (this.props.picType === 'after') {
      dropzoneHeader = 'After';
    }
    return (
      <div id="pics-dropzone-comp">
        <section>
          <div className="dropzone">
            <h2>{dropzoneHeader}</h2>
            {this.state.clientBeforePicPath ?
              <span className="clientPicturesImgWrapper">
                <img
                  className="clientPicturesImg"
                  src={this.state.clientBeforePicPath}
                  alt={this.state.clientBeforePicName}
                />
              </span>
               :
              <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.handleDrop}
              >
                <p>{dropzoneText}</p>
              </Dropzone>
             }
          </div>
          {/* <aside>
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
          </aside> */}
        </section>
        {/* <div>
          {this.state.imageDisplay ? <img src={this.state.imageDisplay.url} alt="thumbnail" /> : null}
        </div> */}
      </div>
    );
  }
}
