/* eslint-disable */

import { USER_CONSTANTS } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggingIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case USER_CONSTANTS.LOGIN_REQUEST:
            return {
                loggingIn: false,
                user: action.user,
                loading: true,
            };
        case USER_CONSTANTS.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.user,
                loading: false,
            };
        case USER_CONSTANTS.LOGIN_TWO_FA_SUCCESS:
            return {
                loggingIn: false,
                user: action.user,
                loading: false,
            };
        case USER_CONSTANTS.LOGIN_FAILURE:
            return {};
        case USER_CONSTANTS.LOGOUT:
            return {};
        default:
            return state;
    }
}
