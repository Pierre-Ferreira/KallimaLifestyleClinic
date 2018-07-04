import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, ButtonToolbar, OverlayTrigger, Popover, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';
import moment from 'moment/moment'
import './ClientPersonalInfoComp.less';

export default class ClientPersonalInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSurnameChange = this.handleSurnameChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      feedbackMessage: 'Busy...',
      feedbackMessageType: 'success',
    });
    const { clientID } = this.props.match.params;
    const clientPersonalInfo = {
      name: this.state.name,
    };
    Meteor.call('client_personal_info.create', clientPersonalInfo, (err, result) => {
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
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Married"
                  value={this.state.married}
                  onChange={this.handleMarriedChange}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="children-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Children:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Children"
                  value={this.state.children}
                  onChange={this.handleChildrenChange}
                />
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
                  value={this.state.otherinfo}
                  onChange={this.handleOtherInfoChange}
                />
              </Col>
            </FormGroup>
          </div>
          <div className="bottom-tier-area">
            <FormGroup>
              <Col sm={12}>
                <Button bsStyle="primary" bsSize="large" block>
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
