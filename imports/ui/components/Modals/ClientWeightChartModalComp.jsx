import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ClientWeightChartContainer from '../../containers/Modals/ClientWeightChartContainer';
import './ClientWeightChartModalComp.less';

export default class ClientWeightChartModalComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div id="client-weight-chart-modal-area">
        <Button
          bsSize="large"
          block
          onClick={this.handleShow}
        >
          Weight Chart
        </Button>

        <Modal id="client-weight-chart-modal" show={this.state.show} onHide={this.handleClose}>
          {/* <Modal.Header>
            <Modal.Title>Client Search</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <ClientWeightChartContainer />
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsSize="large"
              block
              onClick={this.handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
