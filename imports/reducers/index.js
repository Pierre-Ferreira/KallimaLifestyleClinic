import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import gameSettings from './GameSettings';
// import gameAnswers from './GameAnswers';
// import gameCurrentAnswer from './GameCurrentAnswer';
// import gameScore from './GameScore';
import clientPersonalInfo from './ClientPersonalInfo';
import clientHealthInfo from './ClientHealthInfo';
import ClientWeightInfo from './ClientWeightInfo';

const clientInfo = combineReducers({
  // gameSettings,
  // gameAnswers,
  // gameCurrentAnswer,
  // gameScore,
  clientPersonalInfo,
  clientHealthInfo,
  ClientWeightInfo,
  routing: routerReducer,
});

export default clientInfo;
