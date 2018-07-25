import React, { Component } from 'react';
import { Col, Popover, Tooltip, Button, Modal, OverlayTrigger, Alert } from 'react-bootstrap';
import moment from 'moment/moment';
import PicsDropzoneComp from './PicsDropzoneComp';
import './ClientConsentComp.less';

export default class ClientPicsComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {

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
          {/* <div className="client-details">{this.props.clientName} {this.props.clientSurname}</div> */}
          {/* <div className="capture-info">{(this.props.createdAt) ? `Created on ${moment(this.props.createdAt).format('DD-MM-YYYY (HH:mm)')} by ${this.props.createdByUsername}` : null}</div> */}
          {/* <div className="clientid">ClientID: {this.props.clientID}</div> */}
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <div className="lower-tier-area">
          <PicsDropzoneComp picType="before" />
        </div>
      </div>
    );
  }
}
