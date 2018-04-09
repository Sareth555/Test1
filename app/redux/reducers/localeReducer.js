import { CHANGE_LOCALE } from '../ActionType';

const initialState = {
  locale: 'en',
}

export default function localeReducer (state = initialState, action) {
  	switch (action.type) {
		case CHANGE_LOCALE:
			return {
				...state, 
				locale: action.data
			}
		default: return state;
	}
}