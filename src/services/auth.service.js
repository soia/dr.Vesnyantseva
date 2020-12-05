import axios from 'axios';
import { Language } from '../helpers/request-header';

const login = (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const options = {
        method: 'POST',
        headers: {
            language: Language(),
        },
        data: formData,
        url: `${process.env.REACT_APP_API_AUTH_URL}/auth/login`,
    };

    return axios(options).then(user => user);
};

const registration = user => {
    const formData = new FormData();
    const {
        login: loginValue,
        email,
        password,
        confirmPassword,
        masterNodeAddress,
    } = user;
    formData.append('login', loginValue);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    if (masterNodeAddress) {
        formData.append('masterNodeAddress', masterNodeAddress);
    }

    const options = {
        method: 'POST',
        headers: {
            language: Language(),
        },
        data: formData,
        url: `${process.env.REACT_APP_API_AUTH_URL}/auth/register`,
    };

    return axios(options).then(data => data);
};

export { login, registration };
