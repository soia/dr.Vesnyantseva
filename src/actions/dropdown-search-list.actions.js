import { DROPDOWN_SEARCH_LIST_CONSTANTS } from '../constants';

const dropdownSearchListAction = list => ({
    type: DROPDOWN_SEARCH_LIST_CONSTANTS.UPDATE_LIST,
    list,
});

export default dropdownSearchListAction;
