import { GET_TRANSACTIONS_BY_BLOCK } from '../constants';

const transactionsByBlock = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_FAILURE:
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

export default transactionsByBlock;
