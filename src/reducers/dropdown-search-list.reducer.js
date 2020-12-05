/* eslint-disable */
import { DROPDOWN_SEARCH_LIST_CONSTANTS } from '../constants';

export const dropdownSearchList = (state, action) => {
    if (state === undefined) {
        return {
            data: []
        };
    }
    switch (action.type) {
        case DROPDOWN_SEARCH_LIST_CONSTANTS.UPDATE_LIST:
            return {
                data: action.list,
            };
        default:
            return state;
    }
};
