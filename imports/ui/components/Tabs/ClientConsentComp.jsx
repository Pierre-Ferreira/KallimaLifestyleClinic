import React, { Component } from 'react';
import { Col, Popover, Tooltip, Button, Modal, OverlayTrigger, Alert } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import './ClientConsentComp.less';

export default class ClientConsentComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      feedbackMessage: '',
      feedbackMessageType: '',
      trimmedDataURL: null,
    };
    this.clear = this.clear.bind(this);
    this.trimAndSave = this.trimAndSave.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID ||
        this.props.trimmedDataURLRedux !== prevProps.trimmedDataURLRedux
    ) {
      if (this.props.clientID !== prevProps.clientID) {
        this.setState({
          clientID: this.props.clientID,
          feedbackMessage: '',
          feedbackMessageType: '',
          trimmedDataURL: this.props.trimmedDataURLRedux,
        });
      } else {
        this.setState({
          clientID: this.props.clientID,
          trimmedDataURL: this.props.trimmedDataURLRedux,
        });
      }
    }
  }

  clear() {
    this.sigPad.clear();
  }

  trimAndSave() {
    const trimmedDataURL = this.sigPad.getTrimmedCanvas().toDataURL('image/png')
    this.setState({
      trimmedDataURL,
    });
    console.log('trimmedDataURL:', trimmedDataURL)
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else {
      Meteor.call('client_consent.insert', clientID, trimmedDataURL, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Client Consent Saved!',
            feedbackMessageType: 'success',
          });
          this.props.saveClientConsent(clientID, trimmedDataURL);
          console.log('client_payment_info.insert RESULT:', result)
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    }
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
    const { feedbackMessage, feedbackMessageType } = this.state;
    let { trimmedDataURL } = this.state;
    return (
      <div id="client-consent-comp">
        <div className="top-tier-area">
          <div className="client-details">{this.props.clientName} {this.props.clientSurname}</div>
          <div className="clientid">ClientID: {this.props.clientID}</div>
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <div className="lower-tier-area">
          <div className="consent-text">
            I , <span className="consent-name-text">{`${this.props.clientName} ${this.props.clientSurname}`}</span>,
            hereby give consent for Herbal Heel Injections by Mrs. JW Venter or Mrs. S van Zyl.
          </div>
          {trimmedDataURL
            ?
              <div>
                <Col mdOffset={1} md={10}>
                  <img
                    // className={styles.sigImage}
                    src={trimmedDataURL}
                    alt=""
                  />
                </Col>
              </div>
            :
              <div>
                <Button
                  bsStyle="warning"
                  bsSize="large"
                  block
                  onClick={this.clear}
                >
                  Clear
                </Button>
                <Col mdOffset={1} md={10}>
                  <SignatureCanvas
                    penColor="black"
                    backgroundColor="white"
                    canvasProps={{ width: 600, height: 200, className: 'sigCanvas' }}
                    ref={(ref) => { this.sigPad = ref; }}
                  />
                </Col>
                <Button
                  bsStyle="warning"
                  bsSize="large"
                  block
                  onClick={this.trimAndSave}
                >
                  Save
                </Button>
              </div>
          }
        </div>
      </div>
    );
  }
}
