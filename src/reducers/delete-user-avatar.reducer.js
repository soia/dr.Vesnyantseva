import { DELETE_USER_AVATAR } from '../constants';

const deleteAvatar = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: false,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case DELETE_USER_AVATAR.DELETE_USER_AVATAR_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case DELETE_USER_AVATAR.DELETE_USER_AVATAR_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case DELETE_USER_AVATAR.DELETE_USER_AVATAR_FAILURE:
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

export default deleteAvatar;
