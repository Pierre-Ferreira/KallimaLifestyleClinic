import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  weeklyEntriesArr: [],
};

const clientWeightInfo = (state = initialState, action) => {
  console.log('clientWeightInfo action:', action)
  switch (action.type) {
    case types.SAVE_CLIENT_WEIGHT_INFO: {
      return {
        ...state,
        clientID: action.clientID,
        weeklyEntriesArr: action.weeklyEntriesArr,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (
        action &&
        action.clientAllInfoObj &&
        action.clientAllInfoObj.clientWeightInfo &&
        action.clientAllInfoObj.clientWeightInfo.client_weight_info
      ) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientWeightInfo.clientID,
          weeklyEntriesArr: action.clientAllInfoObj.clientWeightInfo.client_weight_info,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          weeklyEntriesArr: [],
        };
      }
      return returnObj;
    }
    case types.INITIALIZE_NEW_CLIENT: {
      state = initialState;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default clientWeightInfo;
