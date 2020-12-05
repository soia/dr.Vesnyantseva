import { GET_SEARCH_QUERY } from '../constants';

const searchQuery = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_SEARCH_QUERY.GET_SEARCH_QUERY_RESET:
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };

    case GET_SEARCH_QUERY.GET_SEARCH_QUERY_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_SEARCH_QUERY.GET_SEARCH_QUERY_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_SEARCH_QUERY.GET_SEARCH_QUERY_FAILURE:
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

export default searchQuery;
