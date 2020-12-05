import { GET_LATEST_BLOCKS } from '../constants';

const getLatestBlocksRequested = () => ({
    type: GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_REQUEST,
});

const getLatestBlocksLoaded = data => ({
    type: GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_SUCCESS,
    payload: data,
});

const getLatestBlocksError = error => ({
    type: GET_LATEST_BLOCKS.GET_LATEST_BLOCKS_FAILURE,
    payload: error,
});

const getLatestBlocksAction = getService => () => dispatch => {
    dispatch(getLatestBlocksRequested());
    getService
        .getLatestBlocks()
        .then(data => {
            dispatch(getLatestBlocksLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getLatestBlocksError(err));
        });
};

export default getLatestBlocksAction;
