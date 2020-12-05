import { GET_LATEST_SINGLE_BLOCK } from '../constants';

const latestSingleBlock = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_FAILURE:
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

export default latestSingleBlock;
