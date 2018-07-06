import * as types from '../constants/ActionTypes';

const initialState = {
  clientID: '',
  name: '',
  surname: '',
  cellNo: '',
  workNo: '',
  email: '',
  married: '',
  children: '',
  hobbies: '',
  occupation: '',
  otherInfo: '',
};

const clientPersonalInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CLIENT_PERSONAL_INFO: {
      console.log('action', action)
      return {
        ...state,
        clientID: action.clientPersonalInfoObj.clientID,
        name: action.clientPersonalInfoObj.name,
        surname: action.clientPersonalInfoObj.surname,
        cellNo: action.clientPersonalInfoObj.cellNo,
        workNo: action.clientPersonalInfoObj.workNo,
        email: action.clientPersonalInfoObj.email,
        married: action.clientPersonalInfoObj.married,
        children: action.clientPersonalInfoObj.children,
        hobbies: action.clientPersonalInfoObj.hobbies,
        occupation: action.clientPersonalInfoObj.occupation,
        otherInfo: action.clientPersonalInfoObj.otherInfo,
      };
    }
    case types.INITIALIZE_NEW_CLIENT: {
      state = initialState;
      return {
        ...state,
        clientID: 'new',
      };
    }
    default:
      return state;
  }
};

export default clientPersonalInfo;
