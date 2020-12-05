import { GET_TRANSACTIONS_BY_BLOCK } from '../constants';

const getTransactionsByBlockRequested = () => ({
    type: GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_REQUEST,
});

const getTransactionsByBlockLoaded = data => ({
    type: GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_SUCCESS,
    payload: data,
});

const getTransactionsByBlockError = error => ({
    type: GET_TRANSACTIONS_BY_BLOCK.GET_TRANSACTIONS_BY_BLOCK_FAILURE,
    payload: error,
});

const getTransactionsByBlockAction = getService => (
    itemsPerPage,
    pageNumber,
    blockId,
) => dispatch => {
    dispatch(getTransactionsByBlockRequested());
    getService
        .getTransactionsByBlock(itemsPerPage, pageNumber, blockId)
        .then(data => {
            dispatch(getTransactionsByBlockLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getTransactionsByBlockError(err));
        });
};

export default getTransactionsByBlockAction;
