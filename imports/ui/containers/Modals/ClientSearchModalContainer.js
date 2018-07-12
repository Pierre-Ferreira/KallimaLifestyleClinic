import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientSearchModalComp from '../../components/Modals/ClientSearchModalComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE4:', state)
  return {
    // clientHealthInfoRedux: state.clientHealthInfo,
    // clientName: state.clientPersonalInfo.name,
    // clientSurname: state.clientPersonalInfo.surname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadClientAllInfo: clientAllInfoObj => dispatch({ type: 'LOAD_CLIENT_ALL_INFO', clientAllInfoObj }),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientSearchModalComp);
