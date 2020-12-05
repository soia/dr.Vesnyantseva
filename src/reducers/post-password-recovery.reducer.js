import { POST_PASSWORD_RECOVERY } from '../constants';

const passwordRecovery = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: false,
            error: false,
        };
    }

    switch (action.type) {
    case POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_REQUEST:
        return {
            data: [],
            loading: true,
            error: false,
        };

    case POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
        };

    case POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_FAILURE:
        return {
            data: [],
            loading: false,
            error: true,
        };

    default:
        return state;
    }
};

export default passwordRecovery;
