import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import WelcomeComp from '../../components/Main/WelcomeComp';

const mapTrackerToProps = (state, props) => {
  return {
  };
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toLoginPage: () => dispatch(push('/login')),
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(WelcomeComp);
