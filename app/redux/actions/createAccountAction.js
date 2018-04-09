import {
    UPDATE_TEXT
} from '../ActionType';

function update(data) {
    return {
        type: UPDATE_TEXT,
        data
    }
}

export function updateText(data) {
    return (dispatch, getState) => {   
        dispatch(update(data));    
    };
}