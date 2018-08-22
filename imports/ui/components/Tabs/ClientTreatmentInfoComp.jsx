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
import './ClientTreatmentInfoComp.less';

export default class ClientTreatmentInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      clientID: '',
      payNum: '',
      date: '',
      treatmentType: '',
      otherInfo: '',
      treatmentEntriesArr: [],
    };
    this.handleSave = this.handleSave.bind(this);
    this.handlePayNumChange = this.handlePayNumChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTreatmentTypeChange = this.handleTreatmentTypeChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID ||
        this.props.treatmentEntriesArrRedux !== prevProps.treatmentEntriesArrRedux
    ) {
      if (this.props.clientID !== prevProps.clientID) {
        this.setState({
          clientID: this.props.clientID,
          feedbackMessage: '',
          feedbackMessageType: '',
          payNum: '',
          date: '',
          treatmentType: '',
          otherInfo: '',
          treatmentEntriesArr: this.props.treatmentEntriesArrRedux,
        });
      } else {
        this.setState({
          clientID: this.props.clientID,
          treatmentEntriesArr: this.props.treatmentEntriesArrRedux,
        });
      }
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

  handleTreatmentTypeChange(e) {
    console.log('handleTreatmentTypeChange:', e.target.value)
    this.setState({
      treatmentType: e.target.value,
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
      payNum: this.state.treatmentEntriesArr[pos].payNum,
      date: this.state.treatmentEntriesArr[pos].date,
      treatmentType: this.state.treatmentEntriesArr[pos].treatmentType,
      otherInfo: this.state.treatmentEntriesArr[pos].otherInfo,
    });
  }

  handleNew() {
    this.setState({
      payNum: this.state.treatmentEntriesArr.length + 1,
      date: '',
      treatmentType: '',
      otherInfo: '',
    });
  }

  handleSave(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });

    const clientTreatmentInfoObj = {
      payNum: Number(this.state.payNum),
      date: this.state.date,
      treatmentType: this.state.treatmentType,
      otherInfo: this.state.otherInfo,
    };
    console.log('clientTreatmentInfoObj:', clientTreatmentInfoObj)
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else {
      Meteor.call('client_treatment_info.update', clientID, clientTreatmentInfoObj, (err, result) => {
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
          // clientTreatmentInfoObj.clientID = clientID;
          this.props.saveClientTreatmentInfo(clientID, result);
          console.log('client_treatment_info.update RESULT:', result)
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
    const inputDisabledFlag = (this.state.payNum) ? false : true;
    return (
      <div id="client-treatment-info-comp">
        <div className="top-tier-area">
          <div className="client-details">{this.props.clientName} {this.props.clientSurname}</div>
          {/* <div className="clientid">ClientID: {this.props.clientID}</div> */}
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <div className="middle-tier-area">
          <div>
            <Form>
              <Grid>
                <Row className="show-grid display-block">
                  <Col sm={1}>
                    <ControlLabel>No.</ControlLabel>
                  </Col>
                  <Col sm={2}>
                    <ControlLabel>Date</ControlLabel>
                  </Col>
                  <Col sm={3}>
                    <ControlLabel>Treatment</ControlLabel>
                  </Col>
                  <Col sm={6}>
                    <ControlLabel>Other Info</ControlLabel>
                  </Col>
                </Row>
                <Row className="display-block">
                  <Col sm={1}>
                    <FormControl
                      type="text"
                      placeholder="No."
                      value={this.state.payNum}
                      onChange={this.handlePayNumChange}
                      disabled
                    />
                  </Col>
                  <Col sm={2}>
                    <DatePicker
                      dateFormat="DD-MM-YYYY"
                      className="date-input"
                      value={this.state.date}
                      onChange={this.handleDateChange}
                      calendarPlacement="right"
                      disabled={inputDisabledFlag}
                    />
                  </Col>
                  <Col sm={3}>
                    <FormControl
                      type="text"
                      placeholder="Treatment"
                      value={this.state.treatmentType}
                      onChange={this.handleTreatmentTypeChange}
                      disabled={inputDisabledFlag}
                    />
                  </Col>
                  <Col sm={6}>
                    <FormControl
                      type="text"
                      placeholder="Other Info"
                      value={this.state.otherInfo}
                      onChange={this.handleOtherInfoChange}
                      disabled={inputDisabledFlag}
                    />
                  </Col>
                </Row>
              </Grid>
              <ButtonToolbar>
                <Col sm={6}>
                  <Button
                    // bsStyle="primary"
                    bsSize="large"
                    block
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    // bsStyle="warning"
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
        <div className="bottom-tier-area">
          {/* <Grid> */}
            <Row className="display-block">
              <Col sm={1}>
                <ControlLabel>No.</ControlLabel>
              </Col>
              <Col sm={2}>
                <ControlLabel>Date</ControlLabel>
              </Col>
              <Col sm={2}>
                <ControlLabel>Treatment:</ControlLabel>
              </Col>
              <Col sm={5}>
                <ControlLabel>Other Info</ControlLabel>
              </Col>
              <Col sm={2}>
                <ControlLabel>Updated</ControlLabel>
              </Col>
            </Row>
          <div className="entries-scroll-area">
            {this.state.treatmentEntriesArr.map((entry, i) => {
              return (
                <Row
                  key={entry.payNum}
                  onClick={e => this.handleSelect(i, e)}
                  className={(i % 2 === 0) ? 'uneven-entries display-block' : 'even-entries display-block'}
                >
                  <Col sm={1}>
                    <div className="div-entries" key={entry.payNum}>{entry.payNum}.</div>
                  </Col>
                  <Col sm={2}>
                    <div className="div-entries" key={entry.payNum}>{moment(entry.date).format('DD-MM-YYYY')}</div>
                  </Col>
                  <Col sm={2}>
                    <div className="div-entries div-center-align" key={entry.payNum}>{entry.treatmentType || '-'}</div>
                  </Col>
                  <Col sm={5}>
                    <div className="div-entries" key={entry.payNum}>{entry.otherInfo || '-'}</div>
                  </Col>
                  <Col sm={2}>
                    <div
                      className="div-entries div-left-align"
                      key={entry.week}
                    >{`${moment(entry.updatedAt).format('DD-MM-YYYY')} (${entry.updatedByUsername})` || '-'}
                    </div>
                  </Col>
                </Row>
                );
              })}
          </div>
          {/* </Grid> */}
        </div>
      </div>
    );
  }
}

ClientTreatmentInfoComp.propTypes = {
  clientID: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  clientSurname: PropTypes.string.isRequired,
  saveClientTreatmentInfo: PropTypes.func.isRequired,
};
