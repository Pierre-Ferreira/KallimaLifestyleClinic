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

  componentDidMount() {
    this.props.clearClientInfo();
  }

  componentWillUnmount() {
    this.props.clearClientInfo();
  }

  logoutFN() {
    Meteor.logout((err, result) => {
      if (err) {
        console.log( `LOGOUT ERROR: ${err.reason}` );
      } else {
        console.log( `LOGOUT RESULT: ${result}` );
        this.props.toHomepage();
      }
    });
  }

  render() {
    let authMenuItems = '';
    if (this.props.userIsSuperAdmin) {
      authMenuItems = (
        <Nav right>
          <NavLink to="">Superadmin: {this.props.username}</NavLink>
          {/* <NavLink to="/admin/blockchain_api">Blockchain API</NavLink>
          <NavLink to="/admin/import_existing">Import</NavLink> */}
          <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
        </Nav>
      );
    } else {
      authMenuItems = (
        <Nav>
          <NavLink to="">{this.props.username}</NavLink>
          <NavLink to="/auth/login" onClick={this.logoutFN}>Logout</NavLink>
        </Nav>
      );
    }
    return authMenuItems;
  }
}

AuthenticatedNavigationLinksComp.propTypes = {
  userIsSuperAdmin: PropTypes.bool.isRequired,
  toHomepage: PropTypes.func.isRequired,
};
