import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import ClientSearchModalContainer from '../../containers/Modals/ClientSearchModalContainer';
import './ClientPersonalInfoComp.less';

export default class ClientPersonalInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      // clientID: '',
      name: '',
      surname: '',
      cellNo: '',
      workNo: '',
      email: '',
      dateOfBirthDay: '',
      dateOfBirthMonth: '',
      dateOfBirthYear: '',
      married: '',
      children: '',
      hobbies: '',
      occupation: '',
      otherInfo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
    this.handleCellnoChange = this.handleCellnoChange.bind(this);
    this.handleWorknoChange = this.handleWorknoChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleDateOfBirthDayChange = this.handleDateOfBirthDayChange.bind(this);
    this.handleDateOfBirthMonthChange = this.handleDateOfBirthMonthChange.bind(this);
    this.handleDateOfBirthYearChange = this.handleDateOfBirthYearChange.bind(this);
    this.handleMarriedChange = this.handleMarriedChange.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
    this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
    this.handleOccupationChange = this.handleOccupationChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    this.createNewButton = this.createNewButton.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.clientID !== prevProps.clientID
    ) {
      this.setState({
        name: this.props.clientPersonalInfoRedux.name,
        surname: this.props.clientPersonalInfoRedux.surname,
        cellNo: this.props.clientPersonalInfoRedux.cellNo,
        workNo: this.props.clientPersonalInfoRedux.workNo,
        email: this.props.clientPersonalInfoRedux.email,
        dateOfBirthDay: this.props.clientPersonalInfoRedux.dateOfBirth ?  this.props.clientPersonalInfoRedux.dateOfBirth.split('-')[0].trim() : '',
        dateOfBirthMonth: this.props.clientPersonalInfoRedux.dateOfBirth ? this.props.clientPersonalInfoRedux.dateOfBirth.split('-')[1].trim() : '',
        dateOfBirthYear: this.props.clientPersonalInfoRedux.dateOfBirth ? this.props.clientPersonalInfoRedux.dateOfBirth.split('-')[2].trim() : '',
        dateOfBirth: this.props.clientPersonalInfoRedux.dateOfBirth,
        married: this.props.clientPersonalInfoRedux.married,
        children: this.props.clientPersonalInfoRedux.children,
        hobbies: this.props.clientPersonalInfoRedux.hobbies,
        occupation: this.props.clientPersonalInfoRedux.occupation,
        otherInfo: this.props.clientPersonalInfoRedux.otherInfo,
      });
    }
  }

  handleNameChange(e) {
    console.log('handleNameChange:', e.target.value)
    this.setState({
      name: e.target.value,
    });
  }

  handleSurnameChange(e) {
    console.log('handleSurnameChange:', e.target.value)
    this.setState({
      surname: e.target.value,
    });
  }

  handleCellnoChange(e) {
    console.log('handleCellnoChange:', e.target.value)
    this.setState({
      cellNo: e.target.value,
    });
  }
  handleWorknoChange(e) {
    console.log('handleWorknoChange:', e.target.value)
    this.setState({
      workNo: e.target.value,
    });
  }
  handleEmailChange(e) {
    console.log('handleEmailChange:', e.target.value)
    this.setState({
      email: e.target.value,
    });
  }
  handleDateOfBirthDayChange(e) {
    console.log('handleDateOfBirthDayChange:', e.target.value)
    this.setState({
      dateOfBirthDay: e.target.value,
    });
  }
  handleDateOfBirthMonthChange(e) {
    console.log('handleDateOfBirthMonthChange:', e.target.value)
    this.setState({
      dateOfBirthMonth: e.target.value,
    });
  }
  handleDateOfBirthYearChange(e) {
    console.log('handleDateOfBirthYearChange:', e.target.value)
    this.setState({
      dateOfBirthYear: e.target.value,
    });
  }
  handleMarriedChange(e) {
    console.log('handleMarriedChange:', e.target.value)
    this.setState({
      married: e.target.value,
    });
  }
  handleChildrenChange(e) {
    console.log('handleChildrenChange:', e.target.value)
    this.setState({
      children: e.target.value,
    });
  }
  handleHobbiesChange(e) {
    console.log('handleHobbiesChange:', e.target.value)
    this.setState({
      hobbies: e.target.value,
    });
  }
  handleOccupationChange(e) {
    console.log('handleOccupationChange:', e.target.value);
    this.setState({
      occupation: e.target.value,
    });
  }
  handleOtherInfoChange(e) {
    console.log('handleOtherInfoChange:', e.target.value);
    this.setState({
      otherInfo: e.target.value,
    });
  }

  createNewButton() {
    this.props.initializeNewClient();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });

    const clientPersonalInfoObj = {
      name: this.state.name,
      surname: this.state.surname,
      cellNo: this.state.cellNo,
      workNo: this.state.workNo,
      email: this.state.email,
      dateOfBirth: `${this.state.dateOfBirthDay} - ${this.state.dateOfBirthMonth} - ${this.state.dateOfBirthYear}`,
      married: this.state.married,
      children: this.state.children,
      hobbies: this.state.hobbies,
      occupation: this.state.occupation,
      otherInfo: this.state.otherInfo,
    };
    console.log('clientPersonalInfoObj:', clientPersonalInfoObj);
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else if (clientID === 'new') {
      Meteor.call('client_personal_info.create', clientPersonalInfoObj, (err, result) => {
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
          // Set the clientID and call the REDUX action creator.
          const clientPersonalInfoResult = result;
          clientPersonalInfoResult.clientID = result._id;
          this.props.saveClientPersonalInfo(clientPersonalInfoResult);
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    } else {
      Meteor.call('client_personal_info.update', clientID, clientPersonalInfoObj, (err, result) => {
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
          // Set the clientID and call the REDUX action creator.
          const clientPersonalInfoResult = result;
          clientPersonalInfoResult.clientID = clientID;
          this.props.saveClientPersonalInfo(clientPersonalInfoResult);
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
    const disableInputsFlag = (this.props.clientID === '');
    const daysArr = [];
    for (let x = 1; x <= 31; x += 1) {
      daysArr.push(x);
    }
    const yearsArr = [];
    for (let x = 1940; x < 2019; x += 1) {
      yearsArr.push(x);
    }
    const childrenArr = [];
    for (let x = 1; x <= 10; x += 1) {
      childrenArr.push(x);
    }
    return (
      <div id="client-personal-info-comp">
        <div className="top-tier-area">
          {/* <Button
            bsSize="large"
            block
            onClick={this.searchClientButton}
          >
            Client Search
          </Button> */}
          <ClientSearchModalContainer />
          <Button
            bsSize="large"
            block
            onClick={this.createNewButton}
          >
            New Client
          </Button>
          <div className="capture-info">{(this.props.createdAt) ? `Created on ${moment(this.props.createdAt).format('DD-MM-YYYY (HH:mm)')} by ${this.props.createdByUsername}` : null}</div>
          <div className="capture-info">{(this.props.updatedAt) ? `Updated on ${moment(this.props.updatedAt).format('DD-MM-YYYY (HH:mm)')} by ${this.props.updatedByUsername}` : null}</div>
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <Form
          horizontal
          autoComplete="off"
        >
          <div className="middle-tier-area">
            <FormGroup controlId="name-formgroup">
              <Col mdOffset={1} md={3}>
                <ControlLabel>Name:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  className=""
                  type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="surname-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Surname:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Surname"
                  value={this.state.surname}
                  onChange={this.handleSurnameChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="cellno-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Cell No:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Cell No"
                  value={this.state.cellNo}
                  onChange={this.handleCellnoChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="workno-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Work No:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Work No"
                  value={this.state.workNo}
                  onChange={this.handleWorknoChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="email-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Email:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="dateOfBirth-formgroup"
              className="dateOfBirth-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Birth Date:</ControlLabel>
              </Col>
              <Col md={2}>
                <FormControl
                  componentClass="select"
                  value={this.state.dateOfBirthDay}
                  onChange={this.handleDateOfBirthDayChange}
                  disabled={disableInputsFlag}
                  className="dateOfBirthDay"
                >
                  <option value="" selected>DD</option>
                  { daysArr.map(x => <option value={x}>{x}</option>) }
                </FormControl>
              </Col>
              <span className="date-dash">-</span>
              <Col md={2}>
                <FormControl
                  componentClass="select"
                  value={this.state.dateOfBirthMonth}
                  onChange={this.handleDateOfBirthMonthChange}
                  disabled={disableInputsFlag}
                  className="dateOfBirthMonth"
                >
                  <option value="">MM</option>
                  <option value="Jan">Jan</option>
                  <option value="Feb">Feb</option>
                  <option value="Mar">Mar</option>
                  <option value="Apr">Apr</option>
                  <option value="May">May</option>
                  <option value="Jun">Jun</option>
                  <option value="Jul">Jul</option>
                  <option value="Aug">Aug</option>
                  <option value="Sep">Sep</option>
                  <option value="Oct">Oct</option>
                  <option value="Nov">Nov</option>
                  <option value="Dec">Dec</option>
                </FormControl>
              </Col>
              <span className="date-dash">-</span>
              <Col md={2}>
                <FormControl
                  componentClass="select"
                  value={this.state.dateOfBirthYear}
                  onChange={this.handleDateOfBirthYearChange}
                  disabled={disableInputsFlag}
                  className="dateOfBirthYear"
                >
                  <option value="">YYYY</option>
                  { yearsArr.map(x => <option value={x}>{x}</option>) }
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="married-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Married:</ControlLabel>
              </Col>
              <Col md={3}>
                <FormControl
                  componentClass="select"
                  value={this.state.married}
                  onChange={this.handleMarriedChange}
                  disabled={disableInputsFlag}
                >
                  <option value="">...</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="children-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Children:</ControlLabel>
              </Col>
              <Col md={3}>
                <FormControl
                  componentClass="select"
                  value={this.state.children}
                  onChange={this.handleChildrenChange}
                  disabled={disableInputsFlag}
                >
                  <option value="">...</option>
                  <option value="0">None</option>
                  { childrenArr.map(x => <option value={x}>{x}</option>) }
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup
              controlId="hobbies-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Hobbies:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Hobbies"
                  value={this.state.hobbies}
                  onChange={this.handleHobbiesChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="occupation-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Occupation:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Occupation"
                  value={this.state.occupation}
                  onChange={this.handleOccupationChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="otherinfo-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Other Info:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Other info"
                  value={this.state.otherInfo}
                  onChange={this.handleOtherInfoChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
          </div>
          <div className="bottom-tier-area">
            <FormGroup>
              <Col sm={12}>
                <Button
                  // bsStyle="primary"
                  bsSize="large"
                  block
                  onClick={this.handleSubmit}
                  disabled={disableInputsFlag}
                >
                  Save
                </Button>
              </Col>
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}

ClientPersonalInfoComp.propTypes = {
  clientID: PropTypes.string.isRequired,
  // clientPersonalInfoRedux.name: PropTypes.shape.isRequired,
  saveClientPersonalInfo: PropTypes.func.isRequired,
  initializeNewClient: PropTypes.func.isRequired,
};
