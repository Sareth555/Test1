import RootNavigator from '../../Root';
import CacheStore from 'react-native-cache-store';

const initialState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(''));

export default navReducer = (state = initialState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState;
};