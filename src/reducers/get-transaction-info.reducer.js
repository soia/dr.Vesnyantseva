import { GET_TRANSACTION_INFO } from '../constants';

const transactionInfo = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_FAILURE:
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

export default transactionInfo;
