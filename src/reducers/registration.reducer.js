/* eslint-disable */

import { USER_CONSTANTS } from '../constants';

export function registration(state = {}, action) {
    switch (action.type) {
        case USER_CONSTANTS.REGISTER_REQUEST:
            return {
                registering: false,
                loading: true,
            };
        case USER_CONSTANTS.REGISTER_SUCCESS:
            return {
                registering: true,
                loading: false,
            };
        case USER_CONSTANTS.REGISTER_FAILURE:
            return {
                registering: false,
                loading: false,
            };
        default:
            return state;
    }
}
