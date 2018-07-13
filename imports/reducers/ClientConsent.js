import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  trimmedDataURL: '',
};

const clientConsent = (state = initialState, action) => {
  console.log('clientConsent action:', action)
  switch (action.type) {
    case types.SAVE_CLIENT_CONSENT: {
      return {
        ...state,
        clientID: action.clientID,
        trimmedDataURL: action.trimmedDataURL,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (action.clientAllInfoObj.clientConsent) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientConsent.clientID,
          trimmedDataURL: action.clientAllInfoObj.clientConsent.trimmedDataURL,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          trimmedDataURL: '',
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
