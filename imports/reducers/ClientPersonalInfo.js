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
  createdAt: '',
  createdBy: '',
  createdByUsername: '',
  updatedAt: '',
  updatedBy: '',
  updatedByUsername: '',
};

const clientPersonalInfo = (state = initialState, action) => {
  console.log('clientPersonalInfo action.type', action.type)
  console.log('clientPersonalInfo action', action)
  switch (action.type) {
    case types.SAVE_CLIENT_PERSONAL_INFO: {
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
        createdAt: action.clientPersonalInfoObj.createdAt,
        createdBy: action.clientPersonalInfoObj.createdBy,
        createdByUsername: action.clientPersonalInfoObj.createdByUsername,
        updatedAt: action.clientPersonalInfoObj.updatedAt,
        updatedBy: action.clientPersonalInfoObj.updatedBy,
        updatedByUsername: action.clientPersonalInfoObj.updatedByUsername,
      };
    }
    case types.LOAD_CLIENT_ALL_INFO: {
      return {
        ...state,
        clientID: action.clientAllInfoObj.clientPersonalInfo._id,
        name: action.clientAllInfoObj.clientPersonalInfo.name,
        surname: action.clientAllInfoObj.clientPersonalInfo.surname,
        cellNo: action.clientAllInfoObj.clientPersonalInfo.cellNo,
        workNo: action.clientAllInfoObj.clientPersonalInfo.workNo,
        email: action.clientAllInfoObj.clientPersonalInfo.email,
        married: action.clientAllInfoObj.clientPersonalInfo.married,
        children: action.clientAllInfoObj.clientPersonalInfo.children,
        hobbies: action.clientAllInfoObj.clientPersonalInfo.hobbies,
        occupation: action.clientAllInfoObj.clientPersonalInfo.occupation,
        otherInfo: action.clientAllInfoObj.clientPersonalInfo.otherInfo,
        createdAt: action.clientAllInfoObj.clientPersonalInfo.createdAt,
        createdBy: action.clientAllInfoObj.clientPersonalInfo.createdBy,
        createdByUsername: action.clientAllInfoObj.clientPersonalInfo.createdByUsername,
        updatedAt: action.clientAllInfoObj.clientPersonalInfo.updatedAt,
        updatedBy: action.clientAllInfoObj.clientPersonalInfo.updatedBy,
        updatedByUsername: action.clientAllInfoObj.clientPersonalInfo.updatedByUsername,
      }
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
