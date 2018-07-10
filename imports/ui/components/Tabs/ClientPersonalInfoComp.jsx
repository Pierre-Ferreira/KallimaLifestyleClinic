import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  // ButtonToolbar,
  // OverlayTrigger,
  // Popover,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
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
    this.handleMarriedChange = this.handleMarriedChange.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
    this.handleHobbiesChange = this.handleHobbiesChange.bind(this);
    this.handleOccupationChange = this.handleOccupationChange.bind(this);
    this.handleOtherInfoChange = this.handleOtherInfoChange.bind(this);
    this.createNewButton = this.createNewButton.bind(this);
  }

  componentDidMount() {
    // const { clientID } = this.props;
    // Meteor.call('client_personal_info.fetch', clientID, (err, result) => {
    //   console.log('ERR:', err);
    //   console.log('RESULT:', result);
    //   this.setState({
    //     name: result.name,
    //     surname: result.surname,
    //     cellNo: result.cellNo,
    //     workNo: result.workNo,
    //     email: result.email,
    //     married: result.married,
    //     children: result.children,
    //     hobbies: result.hobbies,
    //     occupation: result.occupation,
    //     otherInfo: result.otherInfo,
    //   });
    // });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.clientID !== prevProps.clientID) {
      this.setState({
        // clientID: this.props.clientID,
        name: this.props.clientPersonalInfoRedux.name,
        surname: this.props.clientPersonalInfoRedux.surname,
        cellNo: this.props.clientPersonalInfoRedux.cellNo,
        workNo: this.props.clientPersonalInfoRedux.workNo,
        email: this.props.clientPersonalInfoRedux.email,
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
    console.log('handleOccupationChange:', e.target.value)
    this.setState({
      occupation: e.target.value,
    });
  }
  handleOtherInfoChange(e) {
    console.log('handleOtherInfoChange:', e.target.value)
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
      married: this.state.married,
      children: this.state.children,
      hobbies: this.state.hobbies,
      occupation: this.state.occupation,
      otherInfo: this.state.otherInfo,
    };
    console.log('clientPersonalInfoObj:', clientPersonalInfoObj)
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
          clientPersonalInfoObj.clientID = result;
          this.props.saveClientPersonalInfo(clientPersonalInfoObj);
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    } else {
      Meteor.call('client_personal_info.update', clientID, clientPersonalInfoObj, (err) => {
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
          clientPersonalInfoObj.clientID = clientID;
          this.props.saveClientPersonalInfo(clientPersonalInfoObj);
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
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <Form horizontal>
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
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
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
                  bsStyle="primary"
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
