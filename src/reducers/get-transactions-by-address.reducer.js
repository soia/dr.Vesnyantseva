import { GET_TRANSACTIONS_BY_ADDRESS } from '../constants';

const transactionsByAddress = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_FAILURE:
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

export default transactionsByAddress;
