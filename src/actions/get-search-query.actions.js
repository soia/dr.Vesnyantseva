import { GET_SEARCH_QUERY } from '../constants';

const getSearchQueryResetAction = () => ({
    type: GET_SEARCH_QUERY.GET_SEARCH_QUERY_RESET,
});

const getSearchQueryRequested = () => ({
    type: GET_SEARCH_QUERY.GET_SEARCH_QUERY_REQUEST,
});

const getSearchQueryLoaded = data => ({
    type: GET_SEARCH_QUERY.GET_SEARCH_QUERY_SUCCESS,
    payload: data,
});

const getSearchQueryError = error => ({
    type: GET_SEARCH_QUERY.GET_SEARCH_QUERY_FAILURE,
    payload: error,
});

const getSearchQueryAction = getService => searchQuery => dispatch => {
    dispatch(getSearchQueryRequested());
    getService
        .getSearchQuery(searchQuery)
        .then(data => {
            dispatch(getSearchQueryLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getSearchQueryError(err));
        });
};

export { getSearchQueryResetAction };

export default getSearchQueryAction;
