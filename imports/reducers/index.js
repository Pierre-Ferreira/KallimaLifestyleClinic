import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import clientPersonalInfo from './ClientPersonalInfo';
import clientHealthInfo from './ClientHealthInfo';
import clientWeightInfo from './ClientWeightInfo';
import clientPaymentInfo from './ClientPaymentInfo';
import clientConsent from './ClientConsent';

const clientInfo = combineReducers({
  clientPersonalInfo,
  clientHealthInfo,
  clientWeightInfo,
  clientPaymentInfo,
  clientConsent,
  routing: routerReducer,
});

export default clientInfo;
