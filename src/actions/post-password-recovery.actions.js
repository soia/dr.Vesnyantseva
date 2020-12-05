import notification from '../helpers/notifications';
import { POST_PASSWORD_RECOVERY, ERROR_NO_USER } from '../constants';

const postPasswordRecoveryRequested = () => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_REQUEST,
});

const postPasswordRecoveryLoaded = data => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_SUCCESS,
    payload: data,
});

const postPasswordRecoveryError = error => ({
    type: POST_PASSWORD_RECOVERY.FETCH_PASSWORD_RECOVERY_FAILURE,
    payload: error,
});

const fetchPasswordRecoveryAction = postService => (email, t, history) => dispatch => {
    dispatch(postPasswordRecoveryRequested());
    postService
        .passwordRecovery(email)
        .then(data => {
            dispatch(postPasswordRecoveryLoaded(data));
            notification('', t('checkEmailAndFollowLink'), 'success');
            history.push('/');
        })
        .catch(error => {
            dispatch(postPasswordRecoveryError(error));
            const {
                response: { data: { message = 'Something went wrong' } = {} } = {},
            } = error;
            let errorMessage = message;

            if (message === ERROR_NO_USER) {
                errorMessage = t('error.user_is_not_found');
            }

            notification('', errorMessage, 'danger');
        });
};

export default fetchPasswordRecoveryAction;
