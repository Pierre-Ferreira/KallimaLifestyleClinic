import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  treatmentEntriesArr: [],
};

const clientTreatmentInfo = (state = initialState, action) => {
  console.log('clientTreatmentInfo action:', action)
  switch (action.type) {
    case types.SAVE_CLIENT_TREATMENT_INFO: {
      return {
        ...state,
        clientID: action.clientID,
        treatmentEntriesArr: action.treatmentEntriesArr,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (
        action &&
        action.clientAllInfoObj &&
        action.clientAllInfoObj.clientTreatmentInfo &&
        action.clientAllInfoObj.clientTreatmentInfo.client_treatment_info
      ) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientTreatmentInfo.clientID,
          treatmentEntriesArr: action.clientAllInfoObj.clientTreatmentInfo.client_treatment_info,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          treatmentEntriesArr: [],
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

export default clientTreatmentInfo;
