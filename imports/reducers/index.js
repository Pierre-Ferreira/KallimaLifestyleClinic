import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import gameSettings from './GameSettings';
// import gameAnswers from './GameAnswers';
// import gameCurrentAnswer from './GameCurrentAnswer';
// import gameScore from './GameScore';
import clientPersonalInfo from './ClientPersonalInfo';
import clientHealthInfo from './ClientHealthInfo';
import clientWeightInfo from './ClientWeightInfo';
import clientPaymentInfo from './ClientPaymentInfo';

const clientInfo = combineReducers({
  // gameSettings,
  // gameAnswers,
  // gameCurrentAnswer,
  // gameScore,
  clientPersonalInfo,
  clientHealthInfo,
  clientWeightInfo,
  clientPaymentInfo,
  routing: routerReducer,
});

export default clientInfo;
