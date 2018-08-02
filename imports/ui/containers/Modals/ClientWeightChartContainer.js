import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import ClientWeightChartComp from '../../components/Modals/ClientWeightChartComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE8:', state)
  return {
    clientName: state.clientPersonalInfo.name,
    clientSurname: state.clientPersonalInfo.surname,
    clientWeightInfoArr: state.clientWeightInfo.weeklyEntriesArr,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(ClientWeightChartComp);
