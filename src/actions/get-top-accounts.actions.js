import { GET_TOP_ACCOUNTS } from '../constants';

const getTopAccountsRequested = () => ({
    type: GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_REQUEST,
});

const getTopAccountsLoaded = data => ({
    type: GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_SUCCESS,
    payload: data,
});

const getTopAccountsError = error => ({
    type: GET_TOP_ACCOUNTS.GET_TOP_ACCOUNTS_FAILURE,
    payload: error,
});

const getTopAccountsAction = getService => (itemsPerPage, pageNumber) => dispatch => {
    dispatch(getTopAccountsRequested());
    getService
        .getRichList(itemsPerPage, pageNumber)
        .then(data => {
            dispatch(getTopAccountsLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getTopAccountsError(err));
        });
};

export default getTopAccountsAction;
