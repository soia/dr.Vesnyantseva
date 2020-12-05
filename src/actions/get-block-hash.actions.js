import { GET_BLOCK_HASH } from '../constants';

const getBlockHashRequested = () => ({
    type: GET_BLOCK_HASH.GET_BLOCK_HASH_REQUEST,
});

const getBlockHashLoaded = data => ({
    type: GET_BLOCK_HASH.GET_BLOCK_HASH_SUCCESS,
    payload: data,
});

const getBlockHashError = error => ({
    type: GET_BLOCK_HASH.GET_BLOCK_HASH_FAILURE,
    payload: error,
});

const getBlockHashAction = getService => hash => dispatch => {
    dispatch(getBlockHashRequested());
    getService
        .getBlockByHash(hash)
        .then(data => {
            dispatch(getBlockHashLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getBlockHashError(err));
        });
};

export default getBlockHashAction;
