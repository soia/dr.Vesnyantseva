import { GET_LATEST_TRANSACTIONS } from '../constants';

const latestTransactions = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_FAILURE:
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

export default latestTransactions;
