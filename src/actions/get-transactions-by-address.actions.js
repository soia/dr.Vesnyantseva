import { GET_TRANSACTIONS_BY_ADDRESS } from '../constants';

const getTransactionsByAddressRequested = () => ({
    type: GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_REQUEST,
});

const getTransactionsByAddressLoaded = data => ({
    type: GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_SUCCESS,
    payload: data,
});

const getTransactionsByAddressError = error => ({
    type: GET_TRANSACTIONS_BY_ADDRESS.GET_TRANSACTIONS_BY_ADDRESS_FAILURE,
    payload: error,
});

const getTransactionsByAddressAction = getService => (
    itemsPerPage,
    pageNumber,
    address,
) => dispatch => {
    dispatch(getTransactionsByAddressRequested());
    getService
        .getTransactionsByAddress(itemsPerPage, pageNumber, address)
        .then(data => {
            dispatch(getTransactionsByAddressLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getTransactionsByAddressError(err));
        });
};

export default getTransactionsByAddressAction;
