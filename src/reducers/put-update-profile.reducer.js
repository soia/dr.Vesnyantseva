import { PUT_UPDATE_PROFILE } from '../constants';

const updateProfile = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_FAILURE:
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

export default updateProfile;
