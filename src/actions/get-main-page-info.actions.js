import { GET_MAIN_PAGE_INFO } from '../constants';

const getMainPageInfoRequested = () => ({
    type: GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_REQUEST,
});

const getMainPageInfoLoaded = data => ({
    type: GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_SUCCESS,
    payload: data,
});

const getMainPageInfoError = error => ({
    type: GET_MAIN_PAGE_INFO.GET_MAIN_PAGE_INFO_FAILURE,
    payload: error,
});

const getMainPageInfoAction = getService => () => dispatch => {
    dispatch(getMainPageInfoRequested());
    getService
        .getMainPageInfo()
        .then(data => {
            dispatch(getMainPageInfoLoaded(data));
        })
        .catch(err => {
            if (err.response.status === 401) {
                getService.logout();
            }
            dispatch(getMainPageInfoError(err));
        });
};

export default getMainPageInfoAction;
