/* eslint-disable */

import { LOCALE_CONSTANTS } from '../constants';

const getCurrentLocale = locale => ({
    type: LOCALE_CONSTANTS.GET_CURRENT_LOCALE,
    locale,
});

export const getCurrentLocaleActions = {
    getCurrentLocale,
};
