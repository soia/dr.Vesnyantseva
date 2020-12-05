import { MOBILE_SUBLINKS_CONSTANTS } from '../constants';

const mobileSublinks = (state, action) => {
    if (state === undefined) {
        return {
            data: '',
        };
    }
    switch (action.type) {
    case MOBILE_SUBLINKS_CONSTANTS.SUCCESS:
        return {
            data: action.data,
        };
    case MOBILE_SUBLINKS_CONSTANTS.CLEAR:
        return {
            data: '',
        };
    default:
        return state;
    }
};

export default mobileSublinks;
