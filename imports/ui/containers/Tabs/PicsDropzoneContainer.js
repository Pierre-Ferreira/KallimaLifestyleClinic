import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import { push } from 'react-router-redux';
import PicsDropzoneComp from '../../components/Tabs/PicsDropzoneComp';
import ClientBefAftPictures from '../../../api/client_bef_aft_pictures/collection';

const mapTrackerToProps = (state, props) => {
  const allBefAftPicturesHandle = Meteor.subscribe('client_bef_aft_pictures.all');
  const docsReadyYet = allBefAftPicturesHandle.ready();
  const clientBeforePicturesFile = ClientBefAftPictures.findOne({$and: [{"meta.clientID" : props.clientID},{"meta.weightPicType" : props.picType}]}, {sort: {name: 1}});
  console.log('clientBeforePicturesFile:', clientBeforePicturesFile)
  let clientBeforePicPath = '';
  let clientBeforePicName = '';
  if (docsReadyYet) {
    console.log('clientBeforePicturesFile.link()', clientBeforePicturesFile.link())
    clientBeforePicPath = clientBeforePicturesFile.link();
    clientBeforePicName = clientBeforePicturesFile.name;
  }
  return {
    docsReadyYet,
    clientBeforePicturesFile,
    clientBeforePicPath,
    clientBeforePicName,
  };
};

function mapStateToProps(state) {
  console.log('REDUX STATE6:', state)
  return {
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

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(PicsDropzoneComp);
