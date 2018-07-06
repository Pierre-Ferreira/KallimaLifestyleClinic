import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientPersonalInfoComp from '../../components/Tabs/ClientPersonalInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE:', state)
  return {
    clientPersonalInfoRedux: state.clientPersonalInfo,
    // clientPersonalInfoRedux = state
    // clientID: state.clientID,
    // name: state.name,
    // surname: state.surname,
    // cellNo: state.cellNo,
    // workNo: state.workNo,
    // email: state.email,
    // married: state.married,
    // children: state.children,
    // hobbies: state.hobbies,
    // occupation: state.occupation,
    // otherInfo: state.otherInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initializeNewClient: () => dispatch({ type: 'INITIALIZE_NEW_CLIENT' }),
    saveClientPersonalInfo: clientPersonalInfoObj => dispatch({ type: 'SAVE_CLIENT_PERSONAL_INFO', clientPersonalInfoObj }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientPersonalInfoComp);
