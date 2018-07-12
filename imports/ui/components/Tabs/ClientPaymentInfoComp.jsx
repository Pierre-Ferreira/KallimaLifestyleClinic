import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  ButtonToolbar,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment/moment'
import './ClientPaymentInfoComp.less';

export default class ClientPaymentInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      clientID: '',
      payNum: '',
      date: '',
      amount: '',
      payType: '',
      noOfWeeks: '',
      receiverName: '',
      otherInfo: '',
      paymentEntriesArr: [],
    };
    this.handleSave = this.handleSave.bind(this);
    this.handlePayNumChange = this.handlePayNumChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePayTypeChange = this.handlePayTypeChange.bind(this);
    this.handleNoOfWeeksChange = this.handleNoOfWeeksChange.bind(this);
    this.handleReceiverNameChange = this.handleReceiverNameChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID ||
        this.props.paymentEntriesArrRedux !== prevProps.paymentEntriesArrRedux
    ) {
      this.setState({
        clientID: this.props.clientID,
        paymentEntriesArr: this.props.paymentEntriesArrRedux,
      });
    }
  }

  handlePayNumChange(e) {
    console.log('handlePayNumChange:', e.target.value)
    this.setState({
      payNum: e.target.value,
    });
  }

  handleDateChange(date) {
    console.log('handleDateChange:', date)
    this.setState({
      date,
    });
  }

  handleAmountChange(e) {
    console.log('handleAmountChange:', e.target.value)
    this.setState({
      amount: e.target.value,
    });
  }

  handlePayTypeChange(e) {
    console.log('handlePayTypeChange:', e.target.value)
    this.setState({
      payType: e.target.value,
    });
  }
  handleNoOfWeeksChange(e) {
    console.log('handleNoOfWeeksChange:', e.target.value)
    this.setState({
      noOfWeeks: e.target.value,
    });
  }
  handleReceiverNameChange(e) {
    console.log('handleReceiverNameChange:', e.target.value)
    this.setState({
      receiverName: e.target.value,
    });
  }
  handleOtherInfoChange(e) {
    console.log('handleOtherInfoChange:', e.target.value)
    this.setState({
      otherInfo: e.target.value,
    });
  }

  handleSelect(pos) {
    this.setState({
      payNum: this.state.paymentEntriesArr[pos].payNum,
      date: this.state.paymentEntriesArr[pos].date,
      amount: this.state.paymentEntriesArr[pos].amount,
      payType: this.state.paymentEntriesArr[pos].payType,
      noOfWeeks: this.state.paymentEntriesArr[pos].noOfWeeks,
      receiverName: this.state.paymentEntriesArr[pos].receiverName,
      otherInfo: this.state.paymentEntriesArr[pos].otherInfo,
    });
  }

  handleNew() {
    this.setState({
      payNum: this.state.paymentEntriesArr.length + 1,
      date: '',
      amount: '',
      payType: '',
      noOfWeeks: '',
      receiverName: '',
      otherInfo: '',
    });
  }

  handleSave(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });

    const clientPaymentInfoObj = {
      payNum: Number(this.state.payNum),
      date: this.state.date,
      amount: this.state.amount,
      payType: this.state.payType,
      noOfWeeks: this.state.noOfWeeks,
      receiverName: this.state.receiverName,
      otherInfo: this.state.otherInfo,
    };
    console.log('clientPaymentInfoObj:', clientPaymentInfoObj)
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else {
      Meteor.call('client_payment_info.update', clientID, clientPaymentInfoObj, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
          });
        } else {
          this.setState({
            feedbackMessage: 'Client Info Saved!',
            feedbackMessageType: 'success',
          });
          // clientPaymentInfoObj.clientID = clientID;
          this.props.saveClientPaymentInfo(clientID, result);
          console.log('client_payment_info.update RESULT:', result)
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
    const { feedbackMessage, feedbackMessageType } = this.state;
    return (
      <div id="client-payment-info-comp">
        <div className="top-tier-area">
          <div className="client-details">{this.props.clientName} {this.props.clientSurname}</div>
          <div className="clientid">ClientID: {this.props.clientID}</div>
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
          <div>
            <Form>
              <Grid>
                <Row className="show-grid">
                  <Col lg={1}>
                    <ControlLabel>No.</ControlLabel>
                  </Col>
                  <Col lg={2}>
                    <ControlLabel>Date</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Amount</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Type</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Weeks</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Receiver</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Other Info</ControlLabel>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="No."
                      value={this.state.payNum}
                      onChange={this.handlePayNumChange}
                      disabled
                    />
                  </Col>
                  <Col lg={2}>
                    <DatePicker
                      dateFormat="DD-MM-YYYY"
                      className="date-input"
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      calendarPlacement="right"
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Amount"
                      value={this.state.amount}
                      onChange={this.handleAmountChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Type"
                      value={this.state.payType}
                      onChange={this.handlePayTypeChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Weeks"
                      value={this.state.noOfWeeks}
                      onChange={this.handleNoOfWeeksChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Receiver"
                      value={this.state.receiverName}
                      onChange={this.handleReceiverNameChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Other Info"
                      value={this.state.otherInfo}
                      onChange={this.handleOtherInfoChange}
                    />
                  </Col>
                </Row>
              </Grid>
              <ButtonToolbar>
                <Col sm={6}>
                  <Button
                    bsStyle="primary"
                    bsSize="large"
                    block
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    bsStyle="warning"
                    bsSize="large"
                    block
                    onClick={this.handleNew}
                  >
                    New
                  </Button>
                </Col>
                </ButtonToolbar>
            </Form>
          </div>
        </div>
        <div className="lower-tier-area">
          <Grid>
            <Row className="show-grid">
              <Col lg={1}>
                <ControlLabel>No.</ControlLabel>
              </Col>
              <Col lg={2}>
                <ControlLabel>Date</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Amount:</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Type</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Weeks</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Reciever</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Other Info</ControlLabel>
              </Col>
            </Row>
            <div className="entries-scroll-area">
              {this.state.paymentEntriesArr.map((entry, i) => {
                return (
                  <Row
                    key={entry.payNum}
                    onClick={e => this.handleSelect(i, e)}
                  >
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.payNum}</div>
                    </Col>
                    <Col lg={2}>
                      <div className="div-entries" key={entry.payNum}>{moment(entry.date).format('DD-MM-YYYY')}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.amount || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.payType || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.NoOfWeeks || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.receiverName || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.payNum}>{entry.otherInfo || '-'}</div>
                    </Col>
                  </Row>
                )
              })}
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

ClientPaymentInfoComp.propTypes = {
  clientID: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  clientSurname: PropTypes.string.isRequired,
  saveClientPaymentInfo: PropTypes.func.isRequired,
};