import { GET_MAIN_PAGE_INFO } from '../constants';

const mainPageInfo = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_FAILURE:
        return {
            data: {},
            loading: false,
            error: true,
            success: false,
        };

    default:
        return state;
    }
};

export default mainPageInfo;
