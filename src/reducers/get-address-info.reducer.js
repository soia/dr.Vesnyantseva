import { GET_ADDRESS_INFO } from '../constants';

const addressInfo = (state, action) => {
    if (state === undefined) {
        return {
            data: {},
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_ADDRESS_INFO.GET_ADDRESS_INFO_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_ADDRESS_INFO.GET_ADDRESS_INFO_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_ADDRESS_INFO.GET_ADDRESS_INFO_FAILURE:
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

export default addressInfo;
