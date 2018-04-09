import { 
    UPDATE_PERSONAL_INFO
 } from '../ActionType';
 
export function updatePersonalInfo(data){
    return {
        type: UPDATE_PERSONAL_INFO,
        data
    }
}