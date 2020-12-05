import { GET_ALL_TRANSACTIONS } from '../constants';

const getAllTransactionsRequested = () => ({
    type: GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_REQUEST,
});

const getAllTransactionsLoaded = data => ({
    type: GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
    payload: data,
});

const getAllTransactionsError = error => ({
    type: GET_ALL_TRANSACTIONS.GET_ALL_TRANSACTIONS_FAILURE,
    payload: error,
});

const getAllTransactionsAction = getService => (itemsPerPage, pageNumber) => dispatch => {
    dispatch(getAllTransactionsRequested());
    getService
        .getAllTransactions(itemsPerPage, pageNumber)
        .then(data => {
            dispatch(getAllTransactionsLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getAllTransactionsError(err));
        });
};

export default getAllTransactionsAction;
