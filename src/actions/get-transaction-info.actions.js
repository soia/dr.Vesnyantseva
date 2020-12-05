import { GET_TRANSACTION_INFO } from '../constants';

const getTransactionInfoRequested = () => ({
    type: GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_REQUEST,
});

const getTransactionInfoLoaded = data => ({
    type: GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_SUCCESS,
    payload: data,
});

const getTransactionInfoError = error => ({
    type: GET_TRANSACTION_INFO.GET_TRANSACTION_INFO_FAILURE,
    payload: error,
});

const getTransactionInfoAction = getService => hash => dispatch => {
    dispatch(getTransactionInfoRequested());
    getService
        .getTransactionInfo(hash)
        .then(data => {
            dispatch(getTransactionInfoLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getTransactionInfoError(err));
        });
};

export default getTransactionInfoAction;
