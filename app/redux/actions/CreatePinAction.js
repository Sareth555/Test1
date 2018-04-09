import { 
    UPDATE_PIN, 
    UPDATE_PIN_INDEX,
    PIN_CLEAR_ALL,
    PIN_CLEAR_ONE,
    PIN_CREATE_FINISH,
    CONFIRM_PIN,
    PIN_MATCHED,
    SWITCH_2_CONFIRM_PIN
} from '../ActionType';

export function updatePinEnteredIndex(val) {
    if (val > 0 & val < 10) {
        return {
            type: UPDATE_PIN_INDEX,
        }
    }
}

export function switch2ConfirmPin() {
    return {
        type: SWITCH_2_CONFIRM_PIN
    }
}

export function updatePin(val) {    
    switch (val) {
        case '-1':            
            return (dispatch) => {
                dispatch({
                    type: PIN_CLEAR_ONE,                
                });
            };
        case '10':
            return (dispatch) => {
                dispatch({
                    type: PIN_CLEAR_ALL,
                });
            };
        default:
            return (dispatch, getState) => {
                const {pinVal, pinEnteredIndex} = getState().createPinReducer;
                if (pinEnteredIndex > 5) { //
                    // alert(getState().createPinReducer.pinVal);
                } else {
                    dispatch({
                        type: UPDATE_PIN, 
                        data: val
                    });
                    if (getState().createPinReducer.pinVal.length === 6 
                        & getState().createPinReducer.pinState === 1) {                                                
                        const { createPin, pinVal } = getState().createPinReducer;
                        if (createPin === pinVal) {
                            dispatch({
                                type: PIN_MATCHED,
                                data: true
                            });
                        }
                        else alert("PIN not matched!");                        
                    } 
                }
            };
    }
    
}