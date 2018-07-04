import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, ButtonToolbar, OverlayTrigger, Popover, Form, FormGroup, Col, FormControl } from 'react-bootstrap';
import moment from 'moment/moment'
import './ClientPersonalInfoComp.less';

export default class ClientPersonalInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
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
            <FormGroup controlId="formHorizontalName">
              <Col sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type="text" placeholder="Name" />
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
