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
// import moment from 'moment/moment'
import './ClientHealthInfoComp.less';

export default class ClientHealthInfoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      feedbackMessageType: '',
      clientID: '',
      height: '',
      currentWeight: '',
      goalWeight: '',
      allergies: '',
      operations: '',
      alcohol: '',
      favouriteFoods: '',
      health: '',
      otherInfo: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleCurrentWeightChange = this.handleCurrentWeightChange.bind(this);
    this.handleGoalWeightChange = this.handleGoalWeightChange.bind(this);
    this.handleAllergiesChange = this.handleAllergiesChange.bind(this);
    this.handleOperationsChange = this.handleOperationsChange.bind(this);
    this.handleAlcoholChange = this.handleAlcoholChange.bind(this);
    this.handleFavouriteFoodsChange = this.handleFavouriteFoodsChange.bind(this);
    this.handleHealthChange = this.handleHealthChange.bind(this);
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
        height: this.props.clientHealthInfoRedux.height,
        currentWeight: this.props.clientHealthInfoRedux.currentWeight,
        goalWeight: this.props.clientHealthInfoRedux.goalWeight,
        allergies: this.props.clientHealthInfoRedux.allergies,
        operations: this.props.clientHealthInfoRedux.operations,
        alcohol: this.props.clientHealthInfoRedux.alcohol,
        favouriteFoods: this.props.clientHealthInfoRedux.favouriteFoods,
        health: this.props.clientHealthInfoRedux.health,
        otherInfo: this.props.clientHealthInfoRedux.otherInfo,
      });
    }
  }

  handleHeightChange(e) {
    console.log('handleHeightChange:', e.target.value)
    this.setState({
      height: e.target.value,
    });
  }

  handleCurrentWeightChange(e) {
    console.log('handleCurrentWeightChange:', e.target.value)
    this.setState({
      currentWeight: e.target.value,
    });
  }

  handleGoalWeightChange(e) {
    console.log('handleGoalWeightChange:', e.target.value)
    this.setState({
      goalWeight: e.target.value,
    });
  }
  handleAllergiesChange(e) {
    console.log('handleAllergiesChange:', e.target.value)
    this.setState({
      allergies: e.target.value,
    });
  }
  handleOperationsChange(e) {
    console.log('handleOperationsChange:', e.target.value)
    this.setState({
      operations: e.target.value,
    });
  }
  handleAlcoholChange(e) {
    console.log('handleAlcoholChange:', e.target.value)
    this.setState({
      alcohol: e.target.value,
    });
  }
  handleFavouriteFoodsChange(e) {
    console.log('handleFavouriteFoodsChange:', e.target.value)
    this.setState({
      favouriteFoods: e.target.value,
    });
  }
  handleHealthChange(e) {
    console.log('handleHealthChange:', e.target.value)
    this.setState({
      health: e.target.value,
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

    const clientHealthInfoObj = {
      height: this.state.height,
      currentWeight: this.state.currentWeight,
      goalWeight: this.state.goalWeight,
      allergies: this.state.allergies,
      operations: this.state.operations,
      alcohol: this.state.alcohol,
      favouriteFoods: this.state.favouriteFoods,
      health: this.state.health,
      otherInfo: this.state.otherInfo,
    };
    console.log('clientHealthInfoObj:', clientHealthInfoObj)
    const { clientID } = this.props;
    if (clientID === '') {
      this.setState({
        feedbackMessage: 'ERROR: ClientID not set! Create new client',
        feedbackMessageType: 'danger',
      });
    } else if (clientID === 'new') {
      Meteor.call('client_health_info.create', clientHealthInfoObj, (err, result) => {
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
          clientHealthInfoObj.clientID = result;
          this.props.saveClientHealthInfo(clientHealthInfoObj);
          setTimeout(() => {
            this.setState({
              feedbackMessage: '',
              feedbackMessageType: '',
            });
          }, 3000);
        }
      });
    } else {
      Meteor.call('client_health_info.update', clientID, clientHealthInfoObj, (err) => {
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
          clientHealthInfoObj.clientID = clientID;
          this.props.saveClientHealthInfo(clientHealthInfoObj);
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
      <div id="client-health-info-comp">
        <div className="top-tier-area">
          <h1>{this.state.name} {this.state.surname}</h1>
          {(feedbackMessage) ?
            <Alert bsStyle={feedbackMessageType}>
              {feedbackMessage}
            </Alert>
          : null }
        </div>
        <Form horizontal>
          <div className="middle-tier-area">
            <FormGroup controlId="height-formgroup">
              <Col mdOffset={1} md={3}>
                <ControlLabel>Height:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Height"
                  value={this.state.height}
                  onChange={this.handleHeightChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="currentWeight-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Current Weight:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Current Weight"
                  value={this.state.currentWeight}
                  onChange={this.handleCurrentWeightChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="goalWeight-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Cell No:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Cell No"
                  value={this.state.goalWeight}
                  onChange={this.handleGoalWeightChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="allergies-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Work No:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Work No"
                  value={this.state.allergies}
                  onChange={this.handleAllergiesChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="operations-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Operations:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  type="text"
                  placeholder="Operations"
                  value={this.state.operations}
                  onChange={this.handleOperationsChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="alcohol-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Alcohol:</ControlLabel>
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="Alcohol"
                  value={this.state.alcohol}
                  onChange={this.handleAlcoholChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="favouriteFoods-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Favourite Foods:</ControlLabel>
              </Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  placeholder="Favourite Foods"
                  value={this.state.favouriteFoods}
                  onChange={this.handleFavouriteFoodsChange}
                  disabled={disableInputsFlag}
                />
              </Col>
            </FormGroup>
            <FormGroup
              controlId="health-formgroup"
            >
              <Col mdOffset={1} md={3}>
                <ControlLabel>Health:</ControlLabel>
              </Col>
              <Col md={7}>
                <FormControl
                  componentClass="textarea"
                  placeholder="Health"
                  value={this.state.health}
                  onChange={this.handleHealthChange}
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

ClientHealthInfoComp.propTypes = {
  clientID: PropTypes.string.isRequired,
  // clientHealthInfoRedux.name: PropTypes.shape.isRequired,
  saveClientHealthInfo: PropTypes.func.isRequired,
  initializeNewClient: PropTypes.func.isRequired,
};
