/* eslint-disable react/no-array-index-key */
import React, { Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Checkbox } from 'antd';
import classNames from 'classnames';
import withGetService from '../../hoc/with-get-service';
import registrationAction from '../../../actions/registration.actions';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import InfoIcon from '../../assets/images/icons/info_icon';
import { loginPath } from '../../../constants';
import style from './registration.module.scss';
import {
    emailValid,
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
    masterNodeValidation,
} from '../../../helpers';

class Registration extends PureComponent {
    static defaultProps = {
        t: () => {},
        submitRegistration: () => {},
        history: {},
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        submitRegistration: PropTypes.func,
        history: PropTypes.object,
        loading: PropTypes.bool,
    };

    state = {
        login: '',
        email: '',
        passwordValue: '',
        repeatPassword: '',
        masterNodeAddress: '',
        loginErrors: {
            wrongLogin: '',
        },
        emailErrors: {
            wrongEmail: '',
        },
        passwordErrors: {
            oneLowercaseChar: '',
            oneUppercaseChar: '',
            oneNumber: '',
            oneSpecialChar: '',
            minLength: '',
        },
        confirmPasswordErrors: {
            passwordDoesntMatch: '',
        },
        addressMasterNodeErrors: {
            wrongAddressMasterNode: '',
        },
        isDisabled: true,
        isPasswordError: false,
        isConfirmPasswordError: false,
        checkbox: false,
        isMasterNode: false,
    };

    inputOnChange = async event => {
        const { name, value } = event.target;
        const { repeatPassword } = this.state;

        if (name === 'login') {
            await this.loginValidation(name, value);
        }

        if (name === 'email') {
            await this.emailValidation(name, value);
        }

        if (name === 'passwordValue') {
            await this.passwordValidation(name, value);
            await this.confirmPasswordValidation('repeatPassword', repeatPassword);
        }

        if (name === 'repeatPassword') {
            await this.confirmPasswordValidation(name, value);
        }

        if (name === 'masterNodeAddress') {
            await this.addressMasterNodeValidation(name, value);
        }

        await this.checkPasswordError();
        this.checkDisableButton();
    };

    loginValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value,
            loginErrors: {
                ...state.loginErrors,
                wrongLogin:
                    value.trim().length < 2 ? t('error.min_length', { digit: 2 }) : '',
            },
        }));
    };

    emailValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.toLowerCase().trim(),
            emailErrors: {
                ...state.emailErrors,
                wrongEmail: emailValid(value) ? t('error.wrong_email') : '',
            },
        }));
    };

    passwordValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.trim(),
            passwordErrors: {
                ...state.passwordErrors,
                oneLowercaseChar: oneLowercaseChar(value)
                    ? t('error.one_lowercase_char')
                    : '',
                oneUppercaseChar: oneUppercaseChar(value)
                    ? t('error.one_upperrcase_char')
                    : '',
                oneNumber: oneNumber(value) ? t('error.one_number') : '',
                oneSpecialChar: oneSpecialChar(value.trim())
                    ? t('error.one_special_char')
                    : '',
                minLength: value.length < 8 ? t('error.min_length', { digit: 8 }) : '',
            },
        }));
    };

    confirmPasswordValidation = (name, value) => {
        const { t } = this.props;
        const { passwordValue } = this.state;
        const errorText = value !== passwordValue ? t('error.password_does_not_match') : '';
        this.setState({
            [name]: value.trim(),
            confirmPasswordErrors: {
                passwordDoesntMatch: errorText,
            },
        });
    };

    addressMasterNodeValidation = (name, value) => {
        const { t } = this.props;
        const isError = masterNodeValidation(value);
        const errorText = isError ? t('error.wrongAddress') : '';

        this.setState(state => ({
            [name]: value,
            addressMasterNodeErrors: {
                ...state.addressMasterNodeErrors,
                wrongAddressMasterNode: errorText,
            },
        }));
    };

    checkPasswordError = () => {
        const { passwordErrors, confirmPasswordErrors } = this.state;
        const copyPasswordErrors = { ...passwordErrors };
        const copyConfirmPasswordErrors = { ...confirmPasswordErrors };
        Object.keys(copyPasswordErrors).forEach(key => {
            if (!copyPasswordErrors[key]) delete copyPasswordErrors[key];
        });
        Object.keys(copyConfirmPasswordErrors).forEach(key => {
            if (!copyConfirmPasswordErrors[key]) delete copyConfirmPasswordErrors[key];
        });

        this.setState({
            isPasswordError: !!Object.keys(copyPasswordErrors).length,
            isConfirmPasswordError: !!Object.keys(copyConfirmPasswordErrors).length,
        });
    };

    checkDisableButton = () => {
        const {
            isPasswordError,
            repeatPassword,
            loginErrors: { wrongLogin },
            login,
            passwordValue,
            emailErrors: { wrongEmail },
            email,
            isConfirmPasswordError,
            checkbox,
            isMasterNode,
            masterNodeAddress,
            addressMasterNodeErrors: { wrongAddressMasterNode },
        } = this.state;

        const isMasterNodeError = (isMasterNode && wrongAddressMasterNode)
            || (isMasterNode && !masterNodeAddress.length);

        const isValidForm = login
            && email
            && !wrongLogin
            && !wrongEmail
            && passwordValue
            && repeatPassword
            && !isPasswordError
            && !isConfirmPasswordError
            && checkbox;

        this.setState({
            isDisabled: !isValidForm || isMasterNodeError,
        });
    };

    onChangePrivacyPolicy = e => {
        this.setState(
            {
                checkbox: e.target.checked,
            },
            () => {
                this.checkDisableButton();
            },
        );
    };

    onChangeMastreNode = e => {
        this.setState(
            {
                isMasterNode: e.target.checked,
                masterNodeAddress: '',
                addressMasterNodeErrors: {
                    wrongAddressMasterNode: '',
                },
            },
            () => {
                this.checkDisableButton();
            },
        );
    };

    submitRegistration = event => {
        event.preventDefault();
        const { isDisabled } = this.state;
        if (!isDisabled) {
            this.sendData();
        }
    };

    sendData = () => {
        const { t, history, submitRegistration } = this.props;
        const {
            isDisabled,
            login,
            email,
            passwordValue,
            repeatPassword,
            masterNodeAddress,
        } = this.state;

        if (!isDisabled) {
            const user = {
                login,
                email,
                password: passwordValue,
                confirmPassword: repeatPassword,
                masterNodeAddress,
            };

            submitRegistration(user, history, t);
        }
    };

    render() {
        const {
            login,
            email,
            emailErrors: { wrongEmail },
            passwordValue,
            loginErrors: { wrongLogin },
            isPasswordError,
            passwordErrors,
            repeatPassword,
            isDisabled,
            isMasterNode,
            masterNodeAddress,
            addressMasterNodeErrors: { wrongAddressMasterNode },
            confirmPasswordErrors: { passwordDoesntMatch },
        } = this.state;
        const { t, loading } = this.props;

        const passwordErrorStyle = isPasswordError
            ? classNames(style.passwordErrors, style.passwordErrors__hasError)
            : style.passwordErrors;

        return (
            <div className={style.container}>
                <form className={style.form} onSubmit={this.submitRegistration}>
                    <h3 className={style.form__title}>{t('signUp')}</h3>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="login"
                            type="text"
                            name="login"
                            labelText={t('login')}
                            value={login}
                            onChange={this.inputOnChange}
                        />
                        {wrongLogin ? (
                            <div className={style.form__error}>
                                <InfoIcon className={style.form__error_icon} />
                                <p className={style.form__error_text}>
                                    {t('error.min_length', { digit: 2 })}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="email"
                            type="email"
                            name="email"
                            labelText="Email"
                            value={email}
                            onChange={this.inputOnChange}
                        />
                        {wrongEmail ? (
                            <div className={style.form__error}>
                                <InfoIcon className={style.form__error_icon} />
                                <p className={style.form__error_text}>
                                    {t('error.wrong_email')}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="password"
                            type="password"
                            name="passwordValue"
                            labelText={t('password')}
                            value={passwordValue}
                            onChange={this.inputOnChange}
                        />
                    </div>
                    <div className={passwordErrorStyle}>
                        {Object.keys(passwordErrors).map((key, index) => (
                            <Fragment key={index}>
                                {passwordErrors[key] ? (
                                    <p className={style.passwordErrors__item}>
                                        <span className={style.passwordErrors__dot} />
                                        {passwordErrors[key]}
                                    </p>
                                ) : null}
                            </Fragment>
                        ))}
                    </div>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="repeatPassword"
                            type="password"
                            name="repeatPassword"
                            labelText={t('confirmPassword')}
                            value={repeatPassword}
                            onChange={this.inputOnChange}
                        />
                        {passwordDoesntMatch ? (
                            <div className={style.form__error}>
                                <InfoIcon className={style.form__error_icon} />
                                <p className={style.form__error_text}>
                                    {t('error.password_does_not_match')}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.form__checkboxContainer}>
                        <Checkbox onChange={this.onChangeMastreNode}>
                            <p className={style.form__checkboxContainer_text}>
                                {t('iAmMasterNode')}
                            </p>
                        </Checkbox>
                    </div>
                    {isMasterNode ? (
                        <div className={style.form__inputContainer}>
                            <Field
                                id="masterNodeAddress"
                                type="text"
                                name="masterNodeAddress"
                                labelText={t('masterNodeAddress')}
                                value={masterNodeAddress}
                                onChange={this.inputOnChange}
                            />
                            {wrongAddressMasterNode ? (
                                <div className={style.form__error}>
                                    <InfoIcon className={style.form__error_icon} />
                                    <p className={style.form__error_text}>
                                        {wrongAddressMasterNode}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    ) : null}

                    <div className={style.form__checkboxContainer}>
                        <Checkbox onChange={this.onChangePrivacyPolicy}>
                            <p className={style.form__checkboxContainer_text}>
                                {t('iAgree')}{' '}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="/"
                                    className={style.form__checkboxContainer_link}
                                >
                                    {t('termsAndConditions')}
                                </a>
                            </p>
                        </Checkbox>
                    </div>
                    <Button
                        type="submit"
                        disabled={isDisabled}
                        className={style.form__button}
                        loading={loading}
                    >
                        {t('confirm')}
                    </Button>
                    <div className={style.alreadyHaveAccount}>
                        <p className={style.alreadyHaveAccount__text}>
                            {t('alreadyHaveAccount')}
                        </p>
                        <Link to={loginPath} className={style.alreadyHaveAccount__link}>
                            {t('signIn')}
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        registration: { loading },
    } = state;

    return {
        loading,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        submitRegistration: (user, history, t) => registrationAction(user, history, t),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(Registration);
