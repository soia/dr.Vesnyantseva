import notification from '../helpers/notifications';
import { PUT_CHANGE_PASSWORD, ERROR_NO_USER, ERROR_LOGIN_PASSWORD_INVALID } from '../constants';

const putChangePasswordRequested = () => ({
    type: PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_REQUEST,
});

const putChangePasswordLoaded = data => ({
    type: PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_SUCCESS,
    payload: data,
});

const putChangePasswordError = error => ({
    type: PUT_CHANGE_PASSWORD.FETCH_CHANGE_PASSWORD_FAILURE,
    payload: error,
});

const fetchChangePasswordAction = postService => (password, t) => dispatch => {
    dispatch(putChangePasswordRequested());
    postService
        .changePassword(password)
        .then(data => {
            dispatch(putChangePasswordLoaded(data));
            notification(t('passwordChanged'), t('passwordChangedSuccess'), 'success');
        })
        .catch(error => {
            dispatch(putChangePasswordError(error));
            if (error.response.status === 401) {
                postService.logout();
            }

            const {
                response: { data: { message = 'Something went wrong' } = {} } = {},
            } = error;
            let errorMessage = message;
            let errorTitle = '';

            if (message === ERROR_NO_USER) {
                errorTitle = t('error.passwordNotChanged');
                errorMessage = t('error.wrongOldPassword');
            }

            if (message === ERROR_LOGIN_PASSWORD_INVALID) {
                errorTitle = t('error.passwordNotChanged');
                errorMessage = t('error.wrongOldPassword');
            }

            notification(errorTitle, errorMessage, 'danger');
        });
};

export default fetchChangePasswordAction;
