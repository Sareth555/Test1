import {
  PERSONAL_INFO,
  UPDATE_PERSONAL_INFO
} from '../ActionType';

const initialState = {
  ginvenName: '',
  familyName: '',
  userName: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
  address: '',
  postalCode: '',
  country: '',
  passportNo: '',
  dateBirth: '',
  nationality: '',
  placeBirth: '',
  dateIssued: '',
  dateExpiry: '',
  // profileUrl: 'https://avatars1.githubusercontent.com/u/34058742?s=460&v=4'
  profileUrl: 'https://www.royaleboost.com/template/default-profile-img.png'

}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PERSONAL_INFO:
      return { ...state, ...action.data };
    default:
      return state;
  }
}