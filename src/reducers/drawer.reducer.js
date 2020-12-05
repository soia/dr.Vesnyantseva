import { DRAWER_CONSTANTS } from '../constants';

const drawer = (state, action) => {
    if (state === undefined) {
        return {
            menu: false,
            search: false,
        };
    }

    switch (action.type) {
    case DRAWER_CONSTANTS.OPEN_MENU:
        return {
            menu: true,
            search: false,
        };

    case DRAWER_CONSTANTS.OPEN_SEARCH:
        return {
            menu: false,
            search: true,
        };

    case DRAWER_CONSTANTS.CLOSE:
        return {
            menu: false,
            search: false,
        };

    default:
        return state;
    }
};

export default drawer;
