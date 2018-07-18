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
    createdByUsername: state.clientConsent.createdByUsername,
    createdAt: state.clientConsent.createdAt,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveClientConsent: clientConsentInfoObj => dispatch({ type: 'SAVE_CLIENT_CONSENT', clientConsentInfoObj }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientConsentComp);
