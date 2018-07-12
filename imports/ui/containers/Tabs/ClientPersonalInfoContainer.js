import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientPersonalInfoComp from '../../components/Tabs/ClientPersonalInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE2:', state)
  return {
    clientPersonalInfoRedux: state.clientPersonalInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initializeNewClient: () => dispatch({ type: 'INITIALIZE_NEW_CLIENT' }),
    saveClientPersonalInfo: clientPersonalInfoObj => dispatch({ type: 'SAVE_CLIENT_PERSONAL_INFO', clientPersonalInfoObj }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientPersonalInfoComp);
