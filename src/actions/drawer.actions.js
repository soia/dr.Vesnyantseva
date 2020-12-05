import { DRAWER_CONSTANTS } from '../constants';

const openMenu = () => ({
    type: DRAWER_CONSTANTS.OPEN_MENU,
});

const openSearch = () => ({
    type: DRAWER_CONSTANTS.OPEN_SEARCH,
});

const closeMenu = () => ({
    type: DRAWER_CONSTANTS.CLOSE,
});


export {
    openMenu,
    openSearch,
    closeMenu,
};
