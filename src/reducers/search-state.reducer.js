/* eslint-disable */
import { SEARCH__STATE_CONSTANTS } from '../constants';

export const searchState = (state, action) => {
    if (state === undefined) {
        return {
            search: {
                input: '',
                filter: 'ALL',
            },
        };
    }
    switch (action.type) {
        case SEARCH__STATE_CONSTANTS.UPDATE_STATE:
            return {
                search: action.search,
            };
        default:
            return state;
    }
};
