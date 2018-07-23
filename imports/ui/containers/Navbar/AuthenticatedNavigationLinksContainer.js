import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import AuthenticatedNavigationLinksComp from '../../components/Navbar/AuthenticatedNavigationLinksComp';

const mapTrackerToProps = (state, props) => {
  return {
    userIsSuperAdmin: Roles.userIsInRole(Meteor.userId(), 'superadmin'),
  };
};

function mapStateToProps(state) {
  return {
    username: Meteor.user() ? Meteor.user().username : 'UNKNOWN',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearClientInfo: () => dispatch({ type: 'CLEAR_CLIENT_INFO' }),
    toHomepage: () => dispatch(push('/')),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(AuthenticatedNavigationLinksComp);
