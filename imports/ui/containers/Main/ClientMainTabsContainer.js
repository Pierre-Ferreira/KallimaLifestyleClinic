import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientMainTabsComp from '../../components/Main/ClientMainTabsComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('mapStateToProps:', state.clientPersonalInfo)
  return {
    clientID: state.clientPersonalInfo.clientID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientMainTabsComp);
