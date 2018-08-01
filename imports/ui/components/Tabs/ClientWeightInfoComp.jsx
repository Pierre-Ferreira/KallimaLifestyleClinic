import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
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
import ClientWeightChartModalComp from '../Modals/ClientWeightChartModalComp';
import './ClientWeightInfoComp.less';

export default class ClientWeightInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      clientID: '',
      week: '',
      date: '',
      weight: '',
      chest: '',
      middle: '',
      bum: '',
      legUp: '',
      legLow: '',
      arm: '',
      otherInfo: '',
      // ankle: '',
      weeklyEntriesArr: [],
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleChestChange = this.handleChestChange.bind(this);
    this.handleMiddleChange = this.handleMiddleChange.bind(this);
    this.handleBumChange = this.handleBumChange.bind(this);
    this.handleLegUpChange = this.handleLegUpChange.bind(this);
    this.handleLegLowChange = this.handleLegLowChange.bind(this);
    this.handleArmChange = this.handleArmChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    // this.handleAnkleChange = this.handleAnkleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID ||
        this.props.weeklyEntriesArrRedux !== prevProps.weeklyEntriesArrRedux
    ) {
      if (this.props.clientID !== prevProps.clientID) {
        this.setState({
          clientID: this.props.clientID,
          feedbackMessage: '',
          feedbackMessageType: '',
          week: '',
          date: '',
          weight: '',
          chest: '',
          middle: '',
          bum: '',
          legUp: '',
          legLow: '',
          arm: '',
          otherInfo: '',
          // ankle: '',
          weeklyEntriesArr: this.props.weeklyEntriesArrRedux,
        });
      } else {
        this.setState({
          clientID: this.props.clientID,
          weeklyEntriesArr: this.props.weeklyEntriesArrRedux,
        });
      }
    }
  }

  handleWeekChange(e) {
    console.log('handleWeekChange:', e.target.value)
    this.setState({
      week: e.target.value,
    });
  }

  handleDateChange(date) {
    console.log('handleDateChange:', date)
    this.setState({
      date,
    });
  }

  handleWeightChange(e) {
    console.log('handleWeightChange:', e.target.value)
    this.setState({
      weight: e.target.value,
    });
  }

  handleChestChange(e) {
    console.log('handleChestChange:', e.target.value)
    this.setState({
      chest: e.target.value,
    });
  }
  handleMiddleChange(e) {
    console.log('handleMiddleChange:', e.target.value)
    this.setState({
      middle: e.target.value,
    });
  }
  handleBumChange(e) {
    console.log('handleBumChange:', e.target.value)
    this.setState({
      bum: e.target.value,
    });
  }
  handleLegUpChange(e) {
    console.log('handleLegUpChange:', e.target.value)
    this.setState({
      legUp: e.target.value,
    });
  }
  handleLegLowChange(e) {
    console.log('handleLegLowChange:', e.target.value)
    this.setState({
      legLow: e.target.value,
    });
  }
  handleArmChange(e) {
    console.log('handleArmChange:', e.target.value)
    this.setState({
      arm: e.target.value,
    });
  }
  handleOtherInfoChange(e) {
    console.log('handleOtherInfoChange:', e.target.value)
    this.setState({
      otherInfo: e.target.value,
    });
  }
  // handleAnkleChange(e) {
  //   console.log('handleAnkleChange:', e.target.value)
  //   this.setState({
  //     ankle: e.target.value,
  //   });
  // }

  handleSelect(pos) {
    this.setState({
      week: this.state.weeklyEntriesArr[pos].week || '',
      date: this.state.weeklyEntriesArr[pos].date || '',
      weight: this.state.weeklyEntriesArr[pos].weight || '',
      chest: this.state.weeklyEntriesArr[pos].chest || '',
      middle: this.state.weeklyEntriesArr[pos].middle || '',
      bum: this.state.weeklyEntriesArr[pos].bum || '',
      legUp: this.state.weeklyEntriesArr[pos].legUp || '',
      legLow: this.state.weeklyEntriesArr[pos].legLow || '',
      arm: this.state.weeklyEntriesArr[pos].arm || '',
      otherInfo: this.state.weeklyEntriesArr[pos].otherInfo || '',
      // ankle: this.state.weeklyEntriesArr[pos].ankle,
    });
  }

  handleNew() {
    this.setState({
      week: this.state.weeklyEntriesArr.length + 1,
      date: '',
      weight: '',
      chest: '',
      middle: '',
      bum: '',
      legUp: '',
      legLow: '',
      arm: '',
      otherInfo: '',
      // ankle: '',
    });
  }

  handleSave(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });

    const clientWeightInfoObj = {
      week: Number(this.state.week),
      date: this.state.date,
      weight: this.state.weight,
      chest: this.state.chest,
      middle: this.state.middle,
      bum: this.state.bum,
      legUp: this.state.legUp,
      legLow: this.state.legLow,
      arm: this.state.arm,
      otherInfo: this.state.otherInfo,
      // ankle: this.state.ankle,
    };
    console.log('clientWeightInfoObj:', clientWeightInfoObj)
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else {
      Meteor.call('client_weight_info.update', clientID, clientWeightInfoObj, (err, result) => {
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
          // clientWeightInfoObj.clientID = clientID;
          this.props.saveClientWeightInfo(clientID, result);
          console.log('client_weight_info.update RESULT:', result)
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
    const inputDisabledFlag = (this.state.week) ? false : true;
    return (
      <div id="client-weight-info-comp">
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
          <Form>
            <Grid>
              <Row className="show-grid display-block">
                <Col sm={1}>
                  <ControlLabel>Week</ControlLabel>
                </Col>
                <Col className="text-align-center" sm={2}>
                  <ControlLabel>Date</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Weight</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Chest</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Middle</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Bum</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Leg(U)</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Leg(L)</ControlLabel>
                </Col>
                <Col sm={1}>
                  <ControlLabel>Arm</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Other Info:</ControlLabel>
                </Col>
                {/* <Col sm={1}>
                  <ControlLabel>Ankle</ControlLabel>
                </Col> */}
              </Row>
              <Row className="display-block display-block">
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Week"
                    value={this.state.week}
                    onChange={this.handleWeekChange}
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
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Weight"
                    value={this.state.weight}
                    onChange={this.handleWeightChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Chest"
                    value={this.state.chest}
                    onChange={this.handleChestChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Middle"
                    value={this.state.middle}
                    onChange={this.handleMiddleChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Bum"
                    value={this.state.bum}
                    onChange={this.handleBumChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Leg(U)"
                    value={this.state.legUp}
                    onChange={this.handleLegUpChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Leg(L)"
                    value={this.state.legLow}
                    onChange={this.handleLegLowChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Arm"
                    value={this.state.arm}
                    onChange={this.handleArmChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                <Col sm={2}>
                  <FormControl
                    type="text"
                    placeholder="Other Info"
                    value={this.state.otherInfo}
                    onChange={this.handleOtherInfoChange}
                    disabled={inputDisabledFlag}
                  />
                </Col>
                {/* <Col sm={1}>
                  <FormControl
                    type="text"
                    placeholder="Ankle"
                    value={this.state.ankle}
                    onChange={this.handleAnkleChange}
                    disabled={inputDisabledFlag}
                  />
                </Col> */}
              </Row>
            </Grid>
            <ButtonToolbar>
              <Col sm={4}>
                <Button
                  // bsStyle="primary"
                  bsSize="large"
                  block
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </Col>
              <Col sm={4}>
                <Button
                  // bsStyle="warning"
                  bsSize="large"
                  block
                  onClick={this.handleNew}
                >
                  New
                </Button>
              </Col>
              <Col sm={4}>
                <ClientWeightChartModalComp />
              </Col>
            </ButtonToolbar>
          </Form>
        </div>
        <div className="bottom-tier-area">
          <Grid>
            <Row className="show-grid display-block">
              <Col className="col-no-padding" sm={3} >
                <Col sm={2}>
                  <ControlLabel>Week</ControlLabel>
                </Col>
                <Col className="text-align-center" sm={6}>
                  <ControlLabel>Date</ControlLabel>
                </Col>
                <Col sm={4}>
                  <ControlLabel>Weight</ControlLabel>
                </Col>
              </Col>
              <Col className="col-no-padding text-align-center" sm={6} >
                <Col sm={2}>
                  <ControlLabel>Chest</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Middle</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Bum</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Leg(U)</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Leg(L)</ControlLabel>
                </Col>
                <Col sm={2}>
                  <ControlLabel>Arm</ControlLabel>
                </Col>
              </Col>
              <Col className="col-no-padding text-align-center" sm={3} >
                <Col sm={6}>
                  <ControlLabel>Other Info</ControlLabel>
                </Col>
                <Col sm={6}>
                  <ControlLabel>Updated</ControlLabel>
                </Col>
              </Col>
              {/* <Col sm={1}>
                <ControlLabel>By</ControlLabel>
              </Col> */}
            </Row>
            <div className="entries-scroll-area">
              {this.state.weeklyEntriesArr.map((entry, i) => {
                return (
                  <Row
                    key={entry.week}
                    onClick={e => this.handleSelect(i, e)}
                    className={(i % 2 === 0) ? 'uneven-entries display-block' : 'even-entries display-block'}
                  >
                    <Col className="col-no-padding" sm={3} >
                      <Col sm={2} >
                        <div className="div-entries" key={entry.week}>{entry.week}.</div>
                      </Col>
                      <Col sm={6}>
                        <div className="div-entries" key={entry.week}>{moment(entry.date).format('DD-MM-YYYY')}</div>
                      </Col>
                      <Col sm={4}>
                        <div className="div-entries" key={entry.week}>{entry.weight || '-'}</div>
                      </Col>
                    </Col>
                    <Col className="col-no-padding" sm={6} >
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.chest || '-'}</div>
                      </Col>
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.middle || '-'}</div>
                      </Col>
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.bum || '-'}</div>
                      </Col>
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.legUp || '-'}</div>
                      </Col>
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.legLow || '-'}</div>
                      </Col>
                      <Col sm={2}>
                        <div className="div-entries" key={entry.week}>{entry.arm || '-'}</div>
                      </Col>
                    </Col>
                    <Col className="col-no-padding" sm={3}>
                      <Col sm={6}>
                        <div className="div-entries" key={entry.week}>{entry.otherInfo || '-'}</div>
                      </Col>
                      <Col sm={6}>
                        <div
                          className="div-entries"
                          key={entry.week}
                        >{`${moment(entry.updatedAt).format('DD-MM-YYYY')} (${entry.updatedByUsername})` || '-'}
                        </div>
                      </Col>
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

ClientWeightInfoComp.propTypes = {
  clientID: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  clientSurname: PropTypes.string.isRequired,
  saveClientWeightInfo: PropTypes.func.isRequired,
};
