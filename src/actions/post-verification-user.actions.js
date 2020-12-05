import notification from '../helpers/notifications';
import { POST_VERIFICATION_USER, USER_CONSTANTS, profilePath } from '../constants';

const postVerificationUserRequested = () => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_REQUEST,
});

const postVerificationUserLoaded = data => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_SUCCESS,
    payload: data,
});

const postVerificationUserError = error => ({
    type: POST_VERIFICATION_USER.POST_VERIFICATION_USER_FAILURE,
    payload: error,
});

const fetchVerificationUserAction = postService => (token, t, history) => dispatch => {
    const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });
    dispatch(postVerificationUserRequested());
    postService
        .verificationUser(token)
        .then(data => {
            dispatch(postVerificationUserLoaded(data));
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(success(data));
            history.push(`${profilePath}`);
            notification('', t('authorizationSuccessful'), 'success');
        })
        .catch(err => {
            dispatch(postVerificationUserError(err));
            history.push('/');
            notification('', t('error.invalid_verification_link'), 'danger');
        });
};

export default fetchVerificationUserAction;
