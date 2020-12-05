import axios from 'axios';
import { Authorization, Language } from '../helpers/request-header';

const AUTH_URL = process.env.REACT_APP_API_AUTH_URL;

export default class PostService {
    getResource = async (url, data, method) => {
        const options = {
            url,
            method,
            headers: {
                Authorization,
                language: Language(),
            },
            data,
        };
        const response = await axios(options);

        if (response.status !== 200) {
            throw new Error(`${url},received ${response.status}`);
        }
        return response.data;
    };

    logout = () => {
        localStorage.removeItem('user');
        document.location.reload(true);
    };

    verificationUser = async data => {
        const res = await this.getResource(`${AUTH_URL}/auth/verify`, data, 'POST');
        return res;
    };

    passwordRecovery = async data => {
        const res = await this.getResource(`${AUTH_URL}/auth/recover`, data, 'POST');
        return res;
    };

    resetPassword = async data => {
        const res = await this.getResource(`${AUTH_URL}/auth/reset`, data, 'POST');
        return res;
    };

    checkResetToken = async data => {
        const res = await this.getResource(`${AUTH_URL}/auth/check-reset-token`, data, 'POST');
        return res;
    };

    changePassword = async data => {
        const res = await this.getResource(`${AUTH_URL}/auth/changePassword`, data, 'PUT');
        return res;
    };

    deleteAvatar = async data => {
        const res = await this.getResource(`${AUTH_URL}/user/upload`, data, 'DELETE');
        return res;
    };

    updateProfile = async data => {
        const res = await this.getResource(`${AUTH_URL}/user`, data, 'PUT');
        return res;
    };
}
