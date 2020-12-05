import { GET_ADDRESS_CHART } from '../constants';

const getAddressChartRequested = () => ({
    type: GET_ADDRESS_CHART.GET_ADDRESS_CHART_REQUEST,
});

const getAddressChartLoaded = data => ({
    type: GET_ADDRESS_CHART.GET_ADDRESS_CHART_SUCCESS,
    payload: data,
});

const getAddressChartError = error => ({
    type: GET_ADDRESS_CHART.GET_ADDRESS_CHART_FAILURE,
    payload: error,
});

const getAddressChartAction = getService => address => dispatch => {
    dispatch(getAddressChartRequested());
    getService
        .getAddressChart(address)
        .then(data => {
            dispatch(getAddressChartLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getAddressChartError(err));
        });
};

export default getAddressChartAction;
