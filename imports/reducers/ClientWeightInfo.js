import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  weeklyEntriesArr: [],
};

const clientWeightInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CLIENT_HEALTH_INFO: {
      return {
        ...state,
        clientID: action.clientID,
        weeklyEntriesArr: action.weeklyEntriesArr,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (action.weeklyEntriesArr) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientID,
          weeklyEntriesArr: action.clientAllInfoObj.weeklyEntriesArr,
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
