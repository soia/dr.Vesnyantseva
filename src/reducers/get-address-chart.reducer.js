import { GET_ADDRESS_CHART } from '../constants';

const addressChart = (state, action) => {
    if (state === undefined) {
        return {
            data: [],
            loading: true,
            error: false,
            success: false,
        };
    }

    switch (action.type) {
    case GET_ADDRESS_CHART.GET_ADDRESS_CHART_REQUEST:
        return {
            ...state,
            loading: true,
            error: false,
            success: false,
        };

    case GET_ADDRESS_CHART.GET_ADDRESS_CHART_SUCCESS:
        return {
            data: action.payload,
            loading: false,
            error: false,
            success: true,
        };

    case GET_ADDRESS_CHART.GET_ADDRESS_CHART_FAILURE:
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

export default addressChart;
