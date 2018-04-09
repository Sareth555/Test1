import { CHANGE_LOCALE } from '../ActionType';
import I18n from '../../i18n';

export function changeLocale(data) {
    I18n.locale = data;
    return {
        type: CHANGE_LOCALE,
        data
    }
}