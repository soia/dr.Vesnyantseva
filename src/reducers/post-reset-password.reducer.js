import { POST_RESET_PASSWORD } from '../constants';

const resetPassword = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_REQUEST:
        return {
            data: [],
            loading: true,
            error: false,
            success: false,
        };

    case POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_FAILURE:
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

export default resetPassword;
