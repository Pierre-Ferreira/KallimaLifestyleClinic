import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientWeightInfoComp from '../../components/Tabs/ClientWeightInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE3:', state)
  return {
    weeklyEntriesArrRedux: state.clientWeightInfo.weeklyEntriesArr,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // initializeNewClient: () => dispatch({ type: 'INITIALIZE_NEW_CLIENT' }),
    saveClientWeightInfo: (clientID, weeklyEntriesArr) => dispatch({ type: 'SAVE_CLIENT_WEIGHT_INFO', clientID, weeklyEntriesArr }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientWeightInfoComp);
