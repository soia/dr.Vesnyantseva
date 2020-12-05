import notification from '../helpers/notifications';
import { registration } from '../services/auth.service';
import { USER_CONSTANTS, ERROR_EMAIL_TAKEN, ERROR_LOGIN_TAKEN } from '../constants';

const registrationAction = (user, history, t) => {
    const request = payload => ({
        type: USER_CONSTANTS.REGISTER_REQUEST,
        payload,
    });

    const success = payload => ({
        type: USER_CONSTANTS.REGISTER_SUCCESS,
        payload,
    });

    const failure = error => ({
        type: USER_CONSTANTS.REGISTER_FAILURE,
        error,
    });

    return dispatch => {
        dispatch(request());

        registration(user, history, t).then(
            response => {
                dispatch(success(response));
                history.push('/');
                notification('', t('checkEmail'), 'success');
            },
            error => {
                dispatch(failure(error.toString()));
                const { message } = error.response.data;
                let errorMessage = message;

                if (message === ERROR_EMAIL_TAKEN) {
                    errorMessage = t('error.email_already_taken');
                }

                if (message === ERROR_LOGIN_TAKEN) {
                    errorMessage = t('error.login_already_taken');
                }

                notification('', errorMessage, 'danger');
            },
        );
    };
};

export default registrationAction;
