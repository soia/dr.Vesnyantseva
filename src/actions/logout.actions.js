
import { USER_CONSTANTS } from '../constants';

const logoutAction = history => {
    history.push('/');
    localStorage.removeItem('user');
    return { type: USER_CONSTANTS.LOGOUT };
};

export default logoutAction;
