import { GET_BLOCK_BY_INDEX } from '../constants';

const getBlockByIndexRequested = () => ({
    type: GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_REQUEST,
});

const getBlockByIndexLoaded = data => ({
    type: GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_SUCCESS,
    payload: data,
});

const getBlockByIndexError = error => ({
    type: GET_BLOCK_BY_INDEX.GET_BLOCK_BY_INDEX_FAILURE,
    payload: error,
});

const getBlockByIndexAction = getService => index => dispatch => {
    dispatch(getBlockByIndexRequested());
    getService
        .getBlockByIndex(index)
        .then(data => {
            dispatch(getBlockByIndexLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getBlockByIndexError(err));
        });
};

export default getBlockByIndexAction;
