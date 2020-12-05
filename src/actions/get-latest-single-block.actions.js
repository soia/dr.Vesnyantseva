import { GET_LATEST_SINGLE_BLOCK } from '../constants';

const getLatestSingleBlockRequested = () => ({
    type: GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_REQUEST,
});

const getLatestSingleBlockLoaded = data => ({
    type: GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_SUCCESS,
    payload: data,
});

const getLatestSingleBlockError = error => ({
    type: GET_LATEST_SINGLE_BLOCK.GET_LATEST_SINGLE_BLOCK_FAILURE,
    payload: error,
});

const getLatestSingleBlockAction = getService => () => dispatch => {
    dispatch(getLatestSingleBlockRequested());
    getService
        .getLatestSingleBlock()
        .then(data => {
            dispatch(getLatestSingleBlockLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getLatestSingleBlockError(err));
        });
};

export default getLatestSingleBlockAction;
