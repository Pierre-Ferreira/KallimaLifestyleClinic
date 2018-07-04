import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Popover,
  Form,
  FormGroup,
  Col,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import moment from 'moment/moment'
import './ClientPersonalInfoComp.less';

export default class ClientPersonalInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    const { clientID } = this.props.match.params;
    const clientPersonalInfo = {
      name: this.state.name,
      surname: this.state.surname,
      cellno: this.state.cellno,
      workno: this.state.workno,
      email: this.state.email,
      married: this.state.married,
      children: this.state.children,
      hobbies: this.state.hobbies,
      occupation: this.state.occupation,
      otherInfo: this.state.otherInfo,
    };
    if (clientID = 'new') {
      Meteor.call('client_personal_info.create', clientPersonalInfo, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
            clientID: 'new',
          });
        } else {
          this.setState({
            feedbackMessage: 'Player Analysis Info Saved!',
            feedbackMessageType: 'success',
            clientID: result,
          });
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    } else {
      Meteor.call('client_personal_info.update', clientPersonalInfo, (err, result) => {
        if (err) {
          this.setState({
            feedbackMessage: `ERROR: ${err.reason}`,
            feedbackMessageType: 'danger',
            clientID: '',
          });
        } else {
          this.setState({
            feedbackMessage: 'Player Analysis Info Saved!',
            feedbackMessageType: 'success',
            clientID: result,
          });
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
      <div id="client-personal-info-comp">
        <div className="top-tier-area">
          <Button bsSize="large" block>
            Client Search
          </Button>
          <Button bsSize="large" block>
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
                  value={this.state.cellno}
                  onChange={this.handleCellnoChange}
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
                  value={this.state.workno}
                  onChange={this.handleWorknoChange}
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
