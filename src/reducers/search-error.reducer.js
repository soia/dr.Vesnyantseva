import { SEARCH__ERRORS_CONSTANTS } from '../constants';

const searchError = (state, action) => {
    if (state === undefined) {
        return {
            data: {
                isShowMinLength: false,
                noFoundMessage: false,
            },
        };
    }
    switch (action.type) {
    case SEARCH__ERRORS_CONSTANTS.UPDATE_ERROR:
        return {
            data: action.error,
        };
    default:
        return state;
    }
};

export default searchError;
