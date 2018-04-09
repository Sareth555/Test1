
import { combineReducers } from 'redux';

import navReducer from './navReducer';
import localeReducer from './localeReducer';
import ProfileReducer from './ProfileReducer';
import createPinReducer from './createPinReducer';
import createAccountReducer from './createAccountReducer';

export default combineReducers({
  nav: navReducer,
  localeReducer,
  ProfileReducer,
  createPinReducer,
  createAccountReducer,
});