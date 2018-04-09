import {
    UPDATE_TEXT
} from '../ActionType';

const initialState = {
    isValid: false,
    message: 'Please choose a username.',
    username: '',
    usernameMsg: '',
    phoneNumber: '',
    phoneNumberMsg: '',
    password: '',
    passwordMsg: '',
    passwordConfirm: '',
    passwordConfirmMsg: '',
}

export default function createAccountReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_TEXT:
            const newState = {
                ...state,
                ...action.data,
            };
            newState.isValid = true;
            if (newState.password !== '' && newState.passwordConfirm !== '') {
                if(newState.password === newState.passwordConfirm){
                    newState.passwordConfirmMsg = 'Password Matches';
                }else{
                    newState.passwordConfirmMsg = 'Password Not Matches';
                    newState.isValid = false;
                }
            } else {
                newState.passwordConfirmMsg = '';
            }

            if (newState.username === '') {
                newState.message = 'Please choose a username.'
            } else if (newState.phoneNumber == '') {
                newState.message = 'Please enter your phone number.'
            } else if (newState.password === '') {
                newState.message = 'Please choose a password.'
            } else if (newState.passwordConfirm === '') {
                newState.message = 'Please confirm your password.'
            }

            if (newState.username !== '') {
                newState.usernameMsg = 'That works!';
            } else {
                newState.usernameMsg = '';
                newState.isValid = false;
            }
            if (newState.phoneNumber !== '') {
                newState.phoneNumberMsg = 'That works!';
            } else {
                newState.phoneNumberMsg = '';
                newState.isValid = false;
            }
            if (newState.password !== '') {
                newState.passwordMsg = 'That works!';
            } else {
                newState.passwordMsg = '';
                newState.isValid = false;
            }

            if (newState.passwordConfirm === '') {
                newState.isValid = false;
            }

            return newState;
        default: return state;
    }
}