import { GET_ALL_TRANSACTIONS } from '../constants';

const allTransactions = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_FAILURE:
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

export default allTransactions;
