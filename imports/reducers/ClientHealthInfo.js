import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  height: '',
  currentWeight: '',
  goalWeight: '',
  allergies: '',
  operations: '',
  alcohol: '',
  favouriteFoods: '',
  health: '',
  otherInfo: '',
  updatedAt: '',
  updatedBy: '',
  updatedByUsername: '',
};

const clientHealthInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CLIENT_HEALTH_INFO: {
      return {
        ...state,
        clientID: action.clientHealthInfoObj.clientID,
        height: action.clientHealthInfoObj.height,
        currentWeight: action.clientHealthInfoObj.currentWeight,
        goalWeight: action.clientHealthInfoObj.goalWeight,
        allergies: action.clientHealthInfoObj.allergies,
        operations: action.clientHealthInfoObj.operations,
        alcohol: action.clientHealthInfoObj.alcohol,
        favouriteFoods: action.clientHealthInfoObj.favouriteFoods,
        health: action.clientHealthInfoObj.health,
        otherInfo: action.clientHealthInfoObj.otherInfo,
        updatedAt: action.clientHealthInfoObj.updatedAt,
        updatedBy: action.clientHealthInfoObj.updatedBy,
        updatedByUsername: action.clientHealthInfoObj.updatedByUsername,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (action.clientAllInfoObj.clientHealthInfo) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientHealthInfo.clientID,
          height: action.clientAllInfoObj.clientHealthInfo.height,
          currentWeight: action.clientAllInfoObj.clientHealthInfo.currentWeight,
          goalWeight: action.clientAllInfoObj.clientHealthInfo.goalWeight,
          allergies: action.clientAllInfoObj.clientHealthInfo.allergies,
          operations: action.clientAllInfoObj.clientHealthInfo.operations,
          alcohol: action.clientAllInfoObj.clientHealthInfo.alcohol,
          favouriteFoods: action.clientAllInfoObj.clientHealthInfo.favouriteFoods,
          health: action.clientAllInfoObj.clientHealthInfo.health,
          otherInfo: action.clientAllInfoObj.clientHealthInfo.otherInfo,
          updatedAt: action.clientAllInfoObj.clientHealthInfo.updatedAt,
          updatedBy: action.clientAllInfoObj.clientHealthInfo.updatedBy,
          updatedByUsername: action.clientAllInfoObj.clientHealthInfo.updatedByUsername,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          height: '',
          currentWeight: '',
          goalWeight: '',
          allergies: '',
          operations: '',
          alcohol: '',
          favouriteFoods: '',
          health: '',
          otherInfo: '',
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
    case types.CLEAR_CLIENT_INFO: {
      state = initialState;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default clientHealthInfo;
