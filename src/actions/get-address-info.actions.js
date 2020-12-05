import { GET_ADDRESS_INFO } from '../constants';

const getAddressInfoRequested = () => ({
    type: GET_ADDRESS_INFO.GET_ADDRESS_INFO_REQUEST,
});

const getAddressInfoLoaded = data => ({
    type: GET_ADDRESS_INFO.GET_ADDRESS_INFO_SUCCESS,
    payload: data,
});

const getAddressInfoError = error => ({
    type: GET_ADDRESS_INFO.GET_ADDRESS_INFO_FAILURE,
    payload: error,
});

const getAddressInfoAction = getService => address => dispatch => {
    dispatch(getAddressInfoRequested());
    getService
        .getAddressInfo(address)
        .then(data => {
            dispatch(getAddressInfoLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getAddressInfoError(err));
        });
};

export default getAddressInfoAction;
