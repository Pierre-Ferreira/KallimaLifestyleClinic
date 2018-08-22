import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import clientPersonalInfo from './ClientPersonalInfo';
import clientHealthInfo from './ClientHealthInfo';
import clientWeightInfo from './ClientWeightInfo';
import clientPaymentInfo from './ClientPaymentInfo';
import clientTreatmentInfo from './ClientTreatmentInfo';
import clientConsent from './ClientConsent';

const clientInfo = combineReducers({
  clientPersonalInfo,
  clientHealthInfo,
  clientWeightInfo,
  clientPaymentInfo,
  clientTreatmentInfo,
  clientConsent,
  routing: routerReducer,
});

export default clientInfo;
