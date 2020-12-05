import { GET_LATEST_TRANSACTIONS } from '../constants';

const getLatestTransactionsRequested = () => ({
    type: GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_REQUEST,
});

const getLatestTransactionsLoaded = data => ({
    type: GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_SUCCESS,
    payload: data,
});

const getLatestTransactionsError = error => ({
    type: GET_LATEST_TRANSACTIONS.GET_LATEST_TRANSACTIONS_FAILURE,
    payload: error,
});

const getLatestTransactionsAction = getService => () => dispatch => {
    dispatch(getLatestTransactionsRequested());
    getService
        .getLatestTransactions()
        .then(data => {
            dispatch(getLatestTransactionsLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getLatestTransactionsError(err));
        });
};

export default getLatestTransactionsAction;
