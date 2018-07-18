import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientHealthInfoComp from '../../components/Tabs/ClientHealthInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE1:', state)
  return {
    clientHealthInfoRedux: state.clientHealthInfo,
    clientName: state.clientPersonalInfo.name,
    clientSurname: state.clientPersonalInfo.surname,
    updatedByUsername: state.clientHealthInfo.updatedByUsername,
    updatedAt: state.clientHealthInfo.updatedAt,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveClientHealthInfo: clientHealthInfoObj => dispatch({ type: 'SAVE_CLIENT_HEALTH_INFO', clientHealthInfoObj }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientHealthInfoComp);
