import { SEARCH__STATE_CONSTANTS } from '../constants';

const setSearchStateAction = search => ({
    type: SEARCH__STATE_CONSTANTS.UPDATE_STATE,
    search,
});

export default setSearchStateAction;
