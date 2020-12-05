/* eslint-disable import/prefer-default-export */

import { MOBILE_SUBLINKS_CONSTANTS } from '../constants';

const set = data => ({ type: MOBILE_SUBLINKS_CONSTANTS.SUCCESS, data });

const clear = () => ({ type: MOBILE_SUBLINKS_CONSTANTS.CLEAR });

export const mobileSublinksActions = {
    set,
    clear,
};
