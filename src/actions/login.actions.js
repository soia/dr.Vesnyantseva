import notification from '../helpers/notifications';
import {
    USER_CONSTANTS,
    ERROR_LOGIN_PASSWORD_INVALID,
    ERROR_USER_NOT_VERIFICATION,
    profilePath,
} from '../constants';
import { login } from '../services/auth.service';

const loginAction = (email, password, history, t) => {
    const request = user => ({ type: USER_CONSTANTS.LOGIN_REQUEST, user });
    const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });
    const failure = error => ({ type: USER_CONSTANTS.LOGIN_FAILURE, error });

    return dispatch => {
        dispatch(request({ email }));

        login(email, password, history).then(
            user => {
                localStorage.setItem('user', JSON.stringify(user.data));
                dispatch(success(user.data));
                history.push(`${profilePath}`);
                notification('', t('authorizationSuccessful'), 'success');
            },
            error => {
                dispatch(failure(error.toString()));
                const {
                    response: { data: { message = 'Something went wrong' } = {} } = {},
                } = error;
                let errorMessage = message;

                if (message === ERROR_LOGIN_PASSWORD_INVALID) {
                    errorMessage = t('error.invalid_email_or_password');
                }

                if (message === ERROR_USER_NOT_VERIFICATION) {
                    errorMessage = t('checkEmail');
                }
                notification('', errorMessage, 'danger');
            },
        );
    };
};

export default loginAction;
