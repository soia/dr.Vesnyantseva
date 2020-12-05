import { GET_BLOCK_BY_INDEX } from '../constants';

const blockByIndex = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_FAILURE:
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

export default blockByIndex;
