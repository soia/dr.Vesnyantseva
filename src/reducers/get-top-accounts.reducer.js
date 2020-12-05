import { GET_TOP_ACCOUNTS } from '../constants';

const topAccounts = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_FAILURE:
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

export default topAccounts;
