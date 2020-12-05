import notification from '../helpers/notifications';
import { POST_RESET_PASSWORD, ERROR_TOKEN_INVALID, loginPath } from '../constants';

const postResetPasswordRequested = () => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_REQUEST,
});

const postResetPasswordLoaded = data => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_SUCCESS,
    payload: data,
});

const postResetPasswordError = error => ({
    type: POST_RESET_PASSWORD.FETCH_RESET_PASSWORD_FAILURE,
    payload: error,
});

const fetchResetPasswordAction = postService => (newPassword, t, history) => dispatch => {
    dispatch(postResetPasswordRequested());
    postService
        .resetPassword(newPassword)
        .then(data => {
            dispatch(postResetPasswordLoaded(data));
            notification('', t('passwordChangedSuccessfully'), 'success');
            history.push(loginPath);
        })
        .catch(error => {
            dispatch(postResetPasswordError(error.response.data.message));
            const {
                response: { data: { message = 'Something went wrong' } = {} } = {},
            } = error;
            let errorMessage = message;

            if (message === ERROR_TOKEN_INVALID) {
                errorMessage = t('error.invalid_password_recovery_link');
                history.push('/');
            }

            notification('', errorMessage, 'danger');
        });
};

export default fetchResetPasswordAction;
