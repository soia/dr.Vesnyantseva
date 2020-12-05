import { GET_BLOCK_HASH } from '../constants';

const blockHash = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_BLOCK_HASH.GET_BLOCK_HASH_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_BLOCK_HASH.GET_BLOCK_HASH_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_BLOCK_HASH.GET_BLOCK_HASH_FAILURE:
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

export default blockHash;
