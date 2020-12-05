import notification from '../helpers/notifications';
import { DELETE_USER_AVATAR, USER_CONSTANTS } from '../constants';

const postDeleteAvatarRequested = () => ({
    type: DELETE_USER_AVATAR.DELETE_USER_AVATAR_REQUEST,
});

const postDeleteAvatarLoaded = data => ({
    type: DELETE_USER_AVATAR.DELETE_USER_AVATAR_SUCCESS,
    payload: data,
});

const postDeleteAvatarError = error => ({
    type: DELETE_USER_AVATAR.DELETE_USER_AVATAR_FAILURE,
    payload: error,
});

const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });

const fetchDeleteAvatarAction = postService => t => dispatch => {
    dispatch(postDeleteAvatarRequested());
    postService
        .deleteAvatar()
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(success(data));
            dispatch(postDeleteAvatarLoaded(data));
            notification('', t('photoSuccessfullyDeleted'), 'success');
        })
        .catch(err => {
            dispatch(postDeleteAvatarError(err.response.data.message));
            notification('', err.response.data.message, 'danger');
        });
};

export default fetchDeleteAvatarAction;
