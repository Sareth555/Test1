var fontLight = 'NunitoSans-Light';
var fontRegular = 'NunitoSans-Regular';
var fontSemiBold = 'NunitoSans-SemiBold';
var fontBold = 'NunitoSans-Bold';
var khmerBold = 'Nokora-Bold';
var khmerRegular = 'Nokora-Regular';

import {
    AsyncStorage
} from 'react-native';
function setLocal(language) {
        if (language == 'en'){
            fontBold = 'NunitoSans-Bold';
            fontRegular = 'NunitoSans-Regular';
            fontSemiBold = 'NunitoSans-SemiBold';
        }
        else{
            fontBold = 'Nokora-Bold';
            fontRegular = 'Nokora-Regular';
            fontSemiBold = 'Nokora-Regular';
        }
}
function getLocal() {
    AsyncStorage.getItem('fontLocale')
    .then((result) => {
        if (result == 'en'){
            fontBold = 'NunitoSans-Bold';
            fontRegular = 'NunitoSans-Regular';
            fontSemiBold = 'NunitoSans-SemiBold';
        }
        else{
            fontBold = 'Nokora-Bold';
            fontRegular = 'Nokora-Regular';
            fontSemiBold = 'Nokora-Bold';
        }
    })
}
export {getLocal,setLocal,fontLight, fontRegular, fontSemiBold, fontBold, khmerBold, khmerRegular };