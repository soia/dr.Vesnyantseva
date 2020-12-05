import { SEARCH_BLOCK_BY_INDEX } from '../constants';

const searchBlockByIndex = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_FAILURE:
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

export default searchBlockByIndex;
