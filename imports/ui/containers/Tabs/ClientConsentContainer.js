import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientConsentComp from '../../components/Tabs/ClientConsentComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE6:', state)
  return {
    trimmedDataURLRedux: state.clientConsent.trimmedDataURL,
    clientName: state.clientPersonalInfo.name,
    clientSurname: state.clientPersonalInfo.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveClientConsent: (clientID, trimmedDataURL) => dispatch({ type: 'SAVE_CLIENT_CONSENT', clientID, trimmedDataURL }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientConsentComp);
