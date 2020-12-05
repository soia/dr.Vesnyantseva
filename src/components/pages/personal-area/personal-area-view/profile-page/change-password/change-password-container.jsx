import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import notification from '../../../../../../helpers/notifications';
import withPostService from '../../../../../hoc/with-post-service';
import ChangePasswordView from './change-password-view';
import fetchChangePasswordAction from '../../../../../../actions/put-change-password.actions';
import { compose } from '../../../../../../utils';
import {
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
} from '../../../../../../helpers';

export class ChangePassword extends Component {
    static defaultProps = {
        t: () => {},
        fetchChangePassword: () => {},
        success: false,
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        fetchChangePassword: PropTypes.func,
        success: PropTypes.bool,
        loading: PropTypes.bool,
    };

    initialState = {
        newPassword: '',
        repeatPassword: '',
        oldPassword: '',
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
        oldPasswordErrors: {
            oldPasswordLength: '',
        },
        isDisabled: true,
        isNewPasswordError: false,
        isConfirmPasswordError: false,
    };

    state = {
        ...this.initialState,
    };

    componentDidUpdate(prevProps) {
        const { success } = this.props;

        if (success && success !== prevProps.success) {
            this.setState({
                ...this.initialState,
            });
        }
    }

    inputOnChange = async event => {
        const { name, value } = event.target;
        const { repeatPassword } = this.state;

        if (name === 'oldPassword') {
            await this.oldpasswordValidation(name, value);
        }

        if (name === 'newPassword') {
            await this.passwordValidation(name, value);
            await this.confirmpasswordValidation('repeatPassword', repeatPassword);
        }

        if (name === 'repeatPassword') {
            await this.confirmpasswordValidation(name, value);
        }
        await this.checkPasswordError();
        this.checkDisableButton();
    };

    oldpasswordValidation = (name, value) => {
        const { t } = this.props;
        const errorText = value.length < 8 ? t('error.min_length', { digit: 8 }) : '';
        this.setState({
            [name]: value.trim(),
            oldPasswordErrors: {
                oldPasswordLength: errorText,
            },
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
                oneSpecialChar: oneSpecialChar(value.trim())
                    ? t('error.one_special_char')
                    : '',
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

    checkDisableButton = () => {
        const {
            repeatPassword,
            isNewPasswordError,
            isConfirmPasswordError,
            newPassword,
            oldPassword,
            oldPasswordErrors: { oldPasswordLength },
        } = this.state;

        const isValidForm = newPassword
            && repeatPassword
            && !isNewPasswordError
            && !isConfirmPasswordError
            && !oldPasswordLength
            && oldPassword;

        this.setState({
            isDisabled: !isValidForm,
        });
    };

    submitNewPassword = event => {
        event.preventDefault();
        const {
            isDisabled, newPassword, repeatPassword, oldPassword,
        } = this.state;
        const { t, fetchChangePassword } = this.props;

        if (!isDisabled && oldPassword === newPassword) {
            return notification(
                t('error.passwordNotChanged'),
                t('error.newPasswordSameAsOld'),
                'danger',
            );
        }

        if (!isDisabled) {
            const data = {
                oldPassword,
                password: newPassword,
                confirmPassword: repeatPassword,
            };

            fetchChangePassword(data, t);
        }
    };

    render() {
        const {
            newPassword,
            repeatPassword,
            newPasswordErrors,
            isNewPasswordError,
            isConfirmPasswordError,
            confirmPasswordErrors: { passwordDoesntMatch },
            oldPassword,
            oldPasswordErrors: { oldPasswordLength },
            isDisabled,
        } = this.state;

        const { loading } = this.props;

        return (
            <ChangePasswordView
                newPassword={newPassword}
                inputOnChange={this.inputOnChange}
                submitNewPassword={this.submitNewPassword}
                isNewPasswordError={isNewPasswordError}
                isConfirmPasswordError={isConfirmPasswordError}
                newPasswordErrors={newPasswordErrors}
                repeatPassword={repeatPassword}
                passwordDoesntMatch={passwordDoesntMatch}
                isDisabled={isDisabled}
                oldPassword={oldPassword}
                oldPasswordLength={oldPasswordLength}
                loading={loading}
            />
        );
    }
}

const mapStateToProps = state => {
    const {
        changePassword: { success, loading },
    } = state;

    return {
        success,
        loading,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        fetchChangePassword: fetchChangePasswordAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ChangePassword);
