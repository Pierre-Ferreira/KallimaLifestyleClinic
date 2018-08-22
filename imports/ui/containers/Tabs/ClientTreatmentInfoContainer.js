import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientTreatmentInfoComp from '../../components/Tabs/ClientTreatmentInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE5:', state)
  return {
    treatmentEntriesArrRedux: state.clientTreatmentInfo.treatmentEntriesArr,
    clientName: state.clientPersonalInfo.name,
    clientSurname: state.clientPersonalInfo.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveClientTreatmentInfo: (clientID, treatmentEntriesArr) => dispatch({ type: 'SAVE_CLIENT_TREATMENT_INFO', clientID, treatmentEntriesArr }),

  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientTreatmentInfoComp);
