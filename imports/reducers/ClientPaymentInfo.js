import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  paymentEntriesArr: [],
};

const clientPaymentInfo = (state = initialState, action) => {
  console.log('clientPaymentInfo action:', action)
  switch (action.type) {
    case types.SAVE_CLIENT_PAYMENT_INFO: {
      return {
        ...state,
        clientID: action.clientID,
        paymentEntriesArr: action.paymentEntriesArr,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      let returnObj = {};
      if (
        action &&
        action.clientAllInfoObj &&
        action.clientAllInfoObj.clientPaymentInfo &&
        action.clientAllInfoObj.clientPaymentInfo.client_payment_info
      ) {
        returnObj = {
          ...state,
          clientID: action.clientAllInfoObj.clientPaymentInfo.clientID,
          paymentEntriesArr: action.clientAllInfoObj.clientPaymentInfo.client_payment_info,
        };
      } else {
        returnObj = {
          ...state,
          clientID: '',
          paymentEntriesArr: [],
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

export default clientPaymentInfo;
