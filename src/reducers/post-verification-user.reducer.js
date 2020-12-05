import { POST_VERIFICATION_USER } from '../constants';

const verificationUser = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case POST_VERIFICATION_USER.POST_VERIFICATION_USER_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case POST_VERIFICATION_USER.POST_VERIFICATION_USER_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case POST_VERIFICATION_USER.POST_VERIFICATION_USER_FAILURE:
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

export default verificationUser;
