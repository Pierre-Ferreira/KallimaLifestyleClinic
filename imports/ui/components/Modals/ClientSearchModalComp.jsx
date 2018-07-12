import React, { Component } from 'react';
import { Popover, Tooltip, Button, Well, Modal, OverlayTrigger, Alert } from 'react-bootstrap';
import './ClientSearchModalComp.less';

export default class ClientSearchModalComp extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      feedbackMessage: '',
      searchResults: [],
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
  }

  onChangeSearch() {
    const searchValue = document.getElementById('search-input').value;
    Meteor.call('client_personal_info.search', searchValue, (err, result) => {
      if (err) {
        console.log('err:', err);
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('result:', result);
        this.setState({
          feedbackMessage: '',
          searchResults: result,
        });
      }
    });
  }

  onChangeClient(selectedClient) {
    console.log('selectedClient', selectedClient);
    const clientID = selectedClient._id;
    console.log('clientID', clientID);
    Meteor.call('client_all_info.fetch', clientID, (err, result) => {
      if (err) {
        console.log('err:', err);
        this.setState({
          feedbackMessage: err.reason,
          feedbackMessageType: 'danger',
        });
      } else {
        console.log('result:', result);
        this.props.loadClientAllInfo(result);
        this.setState({
          feedbackMessage: '',
          show: false,
        });
      }
    });
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.setState({
  //     feedbackMessage: 'Busy...',
  //     feedbackMessageType: 'success',
  //   });
  //   this.props.saveClientInfoState(this.state.selectedClient)
  // }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const { feedbackMessage, feedbackMessageType } = this.state;
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div id="client-search-modal-area">
        <Button
          bsSize="large"
          block
          onClick={this.handleShow}
        >
          Client Search
        </Button>

        <Modal id="client-search-modal" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Client Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body">
              {(feedbackMessage) ?
                <Alert bsStyle={feedbackMessageType}>
                  {feedbackMessage}
                </Alert>
              : null }
              <form
                id="search-form"
                className="form col-md-12 center-block"
                // onSubmit={this.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    id="search-input"
                    className="form-control input-lg"
                    placeholder="search"
                    autocomplete="off"
                    onChange={this.onChangeSearch}
                  />
                </div>
                <div className="main-results-screen scroll-area">
                  <ul>
                    {this.state.searchResults.map((result, i) => {
                      const resultStr = `${i + 1})
                                  ${result.name}
                                  ${result.surname}
                                  `
                      return (
                        <li key={result._id} className="result-list-entry">
                          <Well bsSize="small" onClick={() => this.onChangeClient(result)}>
                            {resultStr}
                          </Well>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </form>
            </div>
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
