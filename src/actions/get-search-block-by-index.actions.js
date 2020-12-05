import { SEARCH_BLOCK_BY_INDEX } from '../constants';

const searchBlockByIndexRequested = () => ({
    type: SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_REQUEST,
});

const searchBlockByIndexLoaded = data => ({
    type: SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_SUCCESS,
    payload: data,
});

const searchBlockByIndexError = error => ({
    type: SEARCH_BLOCK_BY_INDEX.SEARCH_BLOCK_BY_INDEX_FAILURE,
    payload: error,
});

const searchBlockByIndexAction = getService => index => dispatch => {
    dispatch(searchBlockByIndexRequested());
    getService
        .getBlockByIndex(index)
        .then(data => {
            dispatch(searchBlockByIndexLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(searchBlockByIndexError(err));
        });
};

export default searchBlockByIndexAction;
