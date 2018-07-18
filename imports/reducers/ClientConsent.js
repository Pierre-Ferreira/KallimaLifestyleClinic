import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  trimmedDataURL: '',
  createdAt: '',
  createdBy: '',
  createdByUsername: '',
};

const clientConsent = (state = initialState, action) => {
  console.log('clientConsent action:', action)
  switch (action.type) {
    case types.SAVE_CLIENT_CONSENT: {
      return {
        ...state,
        clientID: action.clientConsentInfoObj.clientID,
        trimmedDataURL: action.clientConsentInfoObj.trimmedDataURL,
        createdAt: action.clientConsentInfoObj.createdAt,
        createdBy: action.clientConsentInfoObj.createdBy,
        createdByUsername: action.clientConsentInfoObj.createdByUsername,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (action.clientAllInfoObj.clientConsent) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientConsent.clientID,
          trimmedDataURL: action.clientAllInfoObj.clientConsent.trimmedDataURL,
          createdAt: action.clientAllInfoObj.clientConsent.createdAt,
          createdBy: action.clientAllInfoObj.clientConsent.createdBy,
          createdByUsername: action.clientAllInfoObj.clientConsent.createdByUsername,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          trimmedDataURL: '',
          createdAt: '',
          createdBy: '',
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

export default clientConsent;
