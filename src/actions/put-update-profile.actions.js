import notification from '../helpers/notifications';
import { USER_CONSTANTS, PUT_UPDATE_PROFILE } from '../constants';

const putUpdateProfileRequested = () => ({
    type: PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_REQUEST,
});

const putUpdateProfileLoaded = data => ({
    type: PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_SUCCESS,
    payload: data,
});

const putUpdateProfileError = error => ({
    type: PUT_UPDATE_PROFILE.FETCH_UPDATE_PROFILE_FAILURE,
    payload: error,
});

const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });

const fetchUpdateProfileAction = postService => (values, t) => dispatch => {
    dispatch(putUpdateProfileRequested());
    postService
        .updateProfile(values)
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(success(data));
            dispatch(putUpdateProfileLoaded(data));
            notification('', t('profileDataSuccessUpdated'), 'success');
        })
        .catch(err => {
            dispatch(putUpdateProfileError(err));
            if (err.response.status === 401) {
                postService.logout();
            }
            notification('', err.response.data.message, 'danger');
        });
};

export default fetchUpdateProfileAction;
