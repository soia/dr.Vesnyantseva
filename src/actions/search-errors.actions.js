import { SEARCH__ERRORS_CONSTANTS } from '../constants';

const setSearchErrorAction = error => ({
    type: SEARCH__ERRORS_CONSTANTS.UPDATE_ERROR,
    error,
});

export default setSearchErrorAction;
