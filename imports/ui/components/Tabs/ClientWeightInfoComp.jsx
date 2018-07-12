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
      legL: '',
      legR: '',
      arm: '',
      neck: '',
      ankle: '',
      weeklyEntriesArr: [],
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleWeekChange = this.handleWeekChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleChestChange = this.handleChestChange.bind(this);
    this.handleMiddleChange = this.handleMiddleChange.bind(this);
    this.handleBumChange = this.handleBumChange.bind(this);
    this.handleLegLChange = this.handleLegLChange.bind(this);
    this.handleLegRChange = this.handleLegRChange.bind(this);
    this.handleArmChange = this.handleArmChange.bind(this);
    this.handleNeckChange = this.handleNeckChange.bind(this);
    this.handleAnkleChange = this.handleAnkleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // componentDidMount() {
  //   const { clientID } = this.props;
  //   console.log('this.props:', this.props);
  //   Meteor.call('client_weight_info.fetch', clientID, (err, result) => {
  //     if (err) {
  //       this.setState({
  //         feedbackMessage: `ERROR: ${err.reason}`,
  //         feedbackMessageType: 'danger',
  //       });
  //     } else {
  //       this.setState({
  //         feedbackMessage: '',
  //         weeklyEntriesArr: result.client_weight_info,
  //       });
  //     }
  //   });
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID ||
        this.props.weeklyEntriesArrRedux !== prevProps.weeklyEntriesArrRedux
    ) {
      this.setState({
        clientID: this.props.clientID,
        weeklyEntriesArr: this.props.weeklyEntriesArrRedux,
      });
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
  handleLegLChange(e) {
    console.log('handleLegLChange:', e.target.value)
    this.setState({
      legL: e.target.value,
    });
  }
  handleLegRChange(e) {
    console.log('handleLegRChange:', e.target.value)
    this.setState({
      legR: e.target.value,
    });
  }
  handleArmChange(e) {
    console.log('handleArmChange:', e.target.value)
    this.setState({
      arm: e.target.value,
    });
  }
  handleNeckChange(e) {
    console.log('handleNeckChange:', e.target.value)
    this.setState({
      neck: e.target.value,
    });
  }
  handleAnkleChange(e) {
    console.log('handleAnkleChange:', e.target.value)
    this.setState({
      ankle: e.target.value,
    });
  }

  handleSelect(pos) {
    console.log("POS:",pos);
    this.setState({
      week: this.state.weeklyEntriesArr[pos].week,
      date: this.state.weeklyEntriesArr[pos].date,
      weight: this.state.weeklyEntriesArr[pos].weight,
      chest: this.state.weeklyEntriesArr[pos].chest,
      middle: this.state.weeklyEntriesArr[pos].middle,
      bum: this.state.weeklyEntriesArr[pos].bum,
      legL: this.state.weeklyEntriesArr[pos].legL,
      legR: this.state.weeklyEntriesArr[pos].legR,
      arm: this.state.weeklyEntriesArr[pos].arm,
      neck: this.state.weeklyEntriesArr[pos].neck,
      ankle: this.state.weeklyEntriesArr[pos].ankle,
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
      legL: '',
      legR: '',
      arm: '',
      neck: '',
      ankle: '',
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
      legL: this.state.legL,
      legR: this.state.legR,
      arm: this.state.arm,
      neck: this.state.neck,
      ankle: this.state.ankle,
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
    return (
      <div id="client-weight-info-comp">
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
                    <ControlLabel>Week</ControlLabel>
                  </Col>
                  <Col lg={2}>
                    <ControlLabel>Date</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Weight:</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Chest</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Middle</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Bum</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Leg(L)</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Leg(R)</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Arm</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Neck:</ControlLabel>
                  </Col>
                  <Col lg={1}>
                    <ControlLabel>Ankle</ControlLabel>
                  </Col>
                </Row>
                <Row>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Week"
                      value={this.state.week}
                      onChange={this.handleWeekChange}
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
                      placeholder="Weight"
                      value={this.state.weight}
                      onChange={this.handleWeightChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Chest"
                      value={this.state.chest}
                      onChange={this.handleChestChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Middle"
                      value={this.state.middle}
                      onChange={this.handleMiddleChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Bum"
                      value={this.state.bum}
                      onChange={this.handleBumChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Leg(L)"
                      value={this.state.legL}
                      onChange={this.handleLegLChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Leg(R)"
                      value={this.state.legR}
                      onChange={this.handleLegRChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Arm"
                      value={this.state.arm}
                      onChange={this.handleArmChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Neck"
                      value={this.state.neck}
                      onChange={this.handleNeckChange}
                    />
                  </Col>
                  <Col lg={1}>
                    <FormControl
                      type="text"
                      placeholder="Ankle"
                      value={this.state.ankle}
                      onChange={this.handleAnkleChange}
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
                <ControlLabel>Week</ControlLabel>
              </Col>
              <Col lg={2}>
                <ControlLabel>Date</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Weight:</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Chest</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Middle</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Bum</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Leg(L)</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Leg(R)</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Arm</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Neck:</ControlLabel>
              </Col>
              <Col lg={1}>
                <ControlLabel>Ankle</ControlLabel>
              </Col>
            </Row>
            <div className="entries-scroll-area">
              {this.state.weeklyEntriesArr.map((entry, i) => {
                return (
                  <Row
                    key={entry.week}
                    onClick={e => this.handleSelect(i, e)}
                  >
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.week}</div>
                    </Col>
                    <Col lg={2}>
                      <div className="div-entries" key={entry.week}>{moment(entry.date).format('DD-MM-YYYY')}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.weight || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div
                        className="div-entries"
                        key={entry.week}
                      >
                        {entry.chest || '-'}
                      </div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.middle || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.bum || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.legL || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.legR || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.arm || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.neck || '-'}</div>
                    </Col>
                    <Col lg={1}>
                      <div className="div-entries" key={entry.week}>{entry.ankle || '-'}</div>
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
