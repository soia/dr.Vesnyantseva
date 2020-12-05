import { PUT_CHANGE_PASSWORD } from '../constants';

const changePassword = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_FAILURE:
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

export default changePassword;
