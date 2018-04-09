import { 
    UPDATE_PIN, 
    UPDATE_PIN_INDEX,
    PIN_CLEAR_ONE,
    PIN_CLEAR_ALL,
    PIN_CREATE_FINISH,
    PIN_CONFIRM,
    PIN_MATCHED,
    SWITCH_2_CONFIRM_PIN
} from '../ActionType';

const initialState = {
    pinMatched: false,
    pinState: 0,
    pinVal: '',
    createPin: '',
    confirmPin: '',
    pinEnteredIndex: 0,
    headerMessage: 'Create Pin',
    subHeaderMessage: 'Please create a safe 6-digit code',
}

export default function localeReducer (state = initialState, action) {
  	switch (action.type) {
        case UPDATE_PIN:
			return {
				...state, 
                pinVal: state.pinVal + action.data,
                pinEnteredIndex: state.pinEnteredIndex + 1
            }
        case UPDATE_PIN_INDEX: 
            return {
                ...state, 
                pinEnteredIndex: state.pinEnteredIndex + 1
            }
        case PIN_CLEAR_ONE:
            return {
                ...state,
                pinVal: state.pinVal.substr(0, state.pinVal.length-1),
                pinEnteredIndex: state.pinEnteredIndex - 1
            }
        case PIN_CLEAR_ALL:
            return {
                ...state,
                pinVal: '',
                pinEnteredIndex: 0
            }
        case PIN_CREATE_FINISH: 
            return {
                ...state,
                createPin: state.pinVal,
                pinVal: '',
                headerMessage: 'Confirm Pin',
                subHeaderMessage: 'Please enter the same 6-digit code to ensure it matches',
                pinEnteredIndex: 0,
                pinState: 1
            }
        case PIN_MATCHED:
            return {
                ...state, 
                pinMatched: action.data,
            }
        case SWITCH_2_CONFIRM_PIN:
            return {
                ...state,
                createPin: state.pinVal,
                pinVal: '',
                headerMessage: 'Confirm Pin',
                subHeaderMessage: 'Please enter the same 6-digit code to ensure it matches',
                pinEnteredIndex: 0,
                pinState: 1
            }
		default: return state;
	}
}