import { GET_LATEST_BLOCKS } from '../constants';

const latestBlocks = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_FAILURE:
        return {
            data: [],
            loading: false,
            error: true,
            success: false,
        };

    default:
        return state;
    }
};

export default latestBlocks;
