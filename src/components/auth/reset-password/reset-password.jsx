/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import notification from '../../../helpers/notifications';
import { INVALID_PASSWORD_RECOVERY_LINK, loginPath } from '../../../constants';
import PostService from '../../../services/post-service';
import withPostService from '../../hoc/with-post-service';
import fetchResetPasswordAction from '../../../actions/post-reset-password.actions';
import { compose } from '../../../utils';
import Field from '../../UI/field/field';
import Button from '../../UI/button/button';
import InfoIcon from '../../assets/images/icons/info_icon';
import spinnerImg from '../../assets/images/spinner.svg';
import style from './reset-password.module.scss';
import {
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
} from '../../../helpers';

class ResetPassword extends PureComponent {
    postService = new PostService();

    static defaultProps = {
        t: () => {},
        submitNewPassword: () => {},
        history: {},
        location: {},
        loggingIn: false,
        passwordChanged: false,
        loadingRequest: false,
    };

    static propTypes = {
        t: PropTypes.func,
        submitNewPassword: PropTypes.func,
        history: PropTypes.object,
        location: PropTypes.object,
        loggingIn: PropTypes.bool,
        passwordChanged: PropTypes.bool,
        loadingRequest: PropTypes.bool,
    };

    state = {
        newPassword: '',
        repeatPassword: '',
        token: '',
        newPasswordErrors: {
            oneLowercaseChar: '',
            oneUppercaseChar: '',
            oneNumber: '',
            oneSpecialChar: '',
            minLength: '',
        },
        confirmPasswordErrors: {
            passwordDoesntMatch: '',
        },
        isDisabled: true,
        isNewPasswordError: false,
        isConfirmPasswordError: false,
        loading: true,
    };

    componentDidMount() {
        const {
            t,
            history,
            location: { search },
            loggingIn,
        } = this.props;
        if (loggingIn) {
            return history.push('/');
        }

        const arrayOfStrings = search.split('=');
        const data = {
            token: arrayOfStrings[1],
        };
        this.postService
            .checkResetToken(data)
            .then(() => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        token: arrayOfStrings[1],
                    });
                }, 500);
            })
            .catch(error => {
                const {
                    response: { data: { message = 'Something went wrong' } = {} } = {},
                } = error;
                let errorMessage = message;

                if (message === INVALID_PASSWORD_RECOVERY_LINK) {
                    errorMessage = t('error.invalid_password_recovery_link');
                }

                notification('', errorMessage, 'danger');
                history.push('/');
            });
    }

    componentDidUpdate(prevProps) {
        const { history, passwordChanged } = this.props;

        if (passwordChanged && passwordChanged !== prevProps.passwordChanged) {
            history.push(loginPath);
        }
    }

    inputOnChange = async event => {
        const { name, value } = event.target;
        if (name === 'newPassword') {
            await this.passwordValidation(name, value);
            await this.confirmpasswordValidation(
                'repeatPassword',
                this.state.repeatPassword,
            );
        }

        if (name === 'repeatPassword') {
            await this.confirmpasswordValidation(name, value);
        }
        await this.checkPasswordError();

        const {
            repeatPassword,
            isNewPasswordError,
            isConfirmPasswordError,
            newPassword,
        } = this.state;
        const isValidForm = newPassword
            && repeatPassword
            && !isNewPasswordError
            && !isConfirmPasswordError;
        this.setState({
            isDisabled: !isValidForm,
        });
    };

    passwordValidation = (name, value) => {
        const { t } = this.props;
        this.setState(state => ({
            [name]: value.trim(),
            newPasswordErrors: {
                ...state.newPasswordErrors,
                oneLowercaseChar: oneLowercaseChar(value)
                    ? t('error.one_lowercase_char')
                    : '',
                oneUppercaseChar: oneUppercaseChar(value)
                    ? t('error.one_upperrcase_char')
                    : '',
                oneNumber: oneNumber(value) ? t('error.one_number') : '',
                oneSpecialChar: oneSpecialChar(value.trim()) ? t('error.one_special_char') : '',
                minLength: value.length < 8 ? t('error.min_length', { digit: 8 }) : '',
            },
        }));
    };

    confirmpasswordValidation = (name, value) => {
        const { t } = this.props;
        const { newPassword } = this.state;
        const errorText = value !== newPassword ? t('error.password_does_not_match') : '';
        this.setState({
            [name]: value.trim(),
            confirmPasswordErrors: {
                passwordDoesntMatch: errorText,
            },
        });
    };

    checkPasswordError = () => {
        const { newPasswordErrors, confirmPasswordErrors } = this.state;
        const copyNewPasswordErrors = { ...newPasswordErrors };
        const copyConfirmPasswordErrors = { ...confirmPasswordErrors };
        Object.keys(copyNewPasswordErrors).forEach(key => {
            if (!copyNewPasswordErrors[key]) delete copyNewPasswordErrors[key];
        });
        Object.keys(copyConfirmPasswordErrors).forEach(key => {
            if (!copyConfirmPasswordErrors[key]) delete copyConfirmPasswordErrors[key];
        });

        this.setState({
            isNewPasswordError: !!Object.keys(copyNewPasswordErrors).length,
            isConfirmPasswordError: !!Object.keys(copyConfirmPasswordErrors).length,
        });
    };

    submitNewPassword = event => {
        event.preventDefault();
        const { t, history, submitNewPassword } = this.props;
        const {
            isDisabled, newPassword, repeatPassword, token,
        } = this.state;

        if (!isDisabled) {
            const data = {
                password: newPassword,
                confirmPassword: repeatPassword,
                token,
            };
            submitNewPassword(data, t, history);
        }
    };

    render() {
        const {
            newPassword,
            repeatPassword,
            newPasswordErrors,
            isNewPasswordError,
            confirmPasswordErrors: { passwordDoesntMatch },
            isDisabled,
            loading,
        } = this.state;
        const { t, loadingRequest } = this.props;

        const newpasswordErrorStyle = isNewPasswordError
            ? classNames(style.passwordErrors, style.passwordErrors__hasError)
            : style.passwordErrors;

        if (loading) {
            return (
                <div className={style.spinnerWrapper}>
                    <img className={style.spinner} src={spinnerImg} alt="spinner" />
                </div>
            );
        }

        return (
            <div className={style.container}>
                <form className={style.form}>
                    <h3 className={style.form__title}>{t('createNewPassword')}</h3>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="password"
                            type="password"
                            name="newPassword"
                            labelText={t('newPassword')}
                            value={newPassword}
                            onChange={this.inputOnChange}
                        />
                    </div>
                    <div className={newpasswordErrorStyle}>
                        {Object.keys(newPasswordErrors).map((key, index) => (
                            <Fragment key={index}>
                                {newPasswordErrors[key] ? (
                                    <p className={style.passwordErrors__item}>
                                        <span className={style.passwordErrors__dot} />
                                        {newPasswordErrors[key]}
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
                            labelText={t('repeatNewPassword')}
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
                    <Button
                        type="submit"
                        disabled={isDisabled}
                        className={style.form__button}
                        onClick={this.submitNewPassword}
                        loading={loadingRequest}
                    >
                        {t('create')}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        authentication: { loggingIn },
        changePassword: { success: passwordChanged },
        resetPassword: { loading: loadingRequest },
    } = state;

    return {
        loggingIn,
        passwordChanged,
        loadingRequest,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        submitNewPassword: fetchResetPasswordAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ResetPassword);
