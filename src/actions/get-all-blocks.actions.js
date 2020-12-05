import { GET_ALL_BLOCKS } from '../constants';

const getAllBlocksRequested = () => ({
    type: GET_ALL_BLOCKS.GET_ALL_BLOCKS_REQUEST,
});

const getAllBlocksLoaded = data => ({
    type: GET_ALL_BLOCKS.GET_ALL_BLOCKS_SUCCESS,
    payload: data,
});

const getAllBlocksError = error => ({
    type: GET_ALL_BLOCKS.GET_ALL_BLOCKS_FAILURE,
    payload: error,
});

const getAllBlocksAction = getService => (itemsPerPage, pageNumber) => dispatch => {
    dispatch(getAllBlocksRequested());
    getService
        .getAllBlocks(itemsPerPage, pageNumber)
        .then(data => {
            dispatch(getAllBlocksLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getAllBlocksError(err));
        });
};

export default getAllBlocksAction;
