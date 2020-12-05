/* eslint-disable */
import { LOCALE_CONSTANTS } from '../constants';

export const currentLocale = (state, action) => {
    if (state === undefined) {
        return {
            locale: '',
        };
    }
    switch (action.type) {
        case LOCALE_CONSTANTS.GET_CURRENT_LOCALE:
            return {
                locale: action.locale,
            };
        default:
            return state;
    }
};
