import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientPaymentInfoComp from '../../components/Tabs/ClientPaymentInfoComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE5:', state)
  return {
    paymentEntriesArrRedux: state.clientPaymentInfo.paymentEntriesArr,
    clientName: state.clientPersonalInfo.name,
    clientSurname: state.clientPersonalInfo.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveClientPaymentInfo: (clientID, paymentEntriesArr) => dispatch({ type: 'SAVE_CLIENT_PAYMENT_INFO', clientID, paymentEntriesArr }),

  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientPaymentInfoComp);
