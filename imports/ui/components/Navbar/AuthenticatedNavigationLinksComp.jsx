import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';

import {
  Nav,
  NavItem,
} from 'react-bootstrap';

export default class AuthenticatedNavigationLinksComp extends Component {
  constructor(props) {
    super(props);
    this.logoutFN = this.logoutFN.bind(this);
  }

  logoutFN() {
    Meteor.logout((err) => {
      if (err) {
        console.log( err.reason );
      } else {
        this.props.toHomepage();
      }
    });
  }

  render() {
    let authMenuItems = '';
    if (this.props.userIsSuperAdmin) {
      authMenuItems = (
        <div>
          <h1>{this.props.username}</h1>
          <Nav right>
            <NavLink to="/admin/blockchain_api">Blockchain API</NavLink>
            <NavLink to="/admin/import_existing">Import</NavLink>
            <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
          </Nav>
        </div>
      );
    } else {
      authMenuItems = (
        <div>
          <h1>{this.props.username}</h1>
          <Nav>
            <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
          </Nav>
        </div>
      );
    }
    return authMenuItems;
  }
}

AuthenticatedNavigationLinksComp.propTypes = {
  userIsSuperAdmin: PropTypes.bool.isRequired,
  toHomepage: PropTypes.func.isRequired,
};
