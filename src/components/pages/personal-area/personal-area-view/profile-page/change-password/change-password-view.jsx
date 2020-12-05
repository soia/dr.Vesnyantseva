/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Field from '../../../../../UI/field/field';
import InfoIcon from '../../../../../assets/images/icons/info_icon';
import Button from '../../../../../UI/button/button';
import style from './change-password.module.scss';

const SecurityView = ({
    newPassword,
    oldPassword,
    oldPasswordLength,
    inputOnChange,
    submitNewPassword,
    isNewPasswordError,
    newPasswordErrors,
    repeatPassword,
    passwordDoesntMatch,
    isDisabled,
    loading,
}) => {
    const { t } = useTranslation();

    const newpasswordErrorStyle = isNewPasswordError
        ? classNames(style.passwordErrors, style.passwordErrors__hasError)
        : style.passwordErrors;

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <form className={style.form}>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="oldPassword"
                            type="password"
                            name="oldPassword"
                            labelText={t('oldPassword')}
                            value={oldPassword}
                            onChange={inputOnChange}
                            inputStyle={style.form__input}
                            labelStyle={style.form__label}
                            labelStyleActive={style.form__labelActive}
                        />
                        {oldPasswordLength ? (
                            <div className={style.form__error}>
                                <InfoIcon className={style.form__error_icon} />
                                <p className={style.form__error_text}>
                                    {oldPasswordLength}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            labelText={t('newPassword')}
                            value={newPassword}
                            onChange={inputOnChange}
                            inputStyle={style.form__input}
                            labelStyle={style.form__label}
                            labelStyleActive={style.form__labelActive}
                        />
                        <div className={style.passwordErrors__mobile}>
                            <div className={newpasswordErrorStyle}>
                                {Object.keys(newPasswordErrors).map((key, index) => (
                                    <Fragment key={index}>
                                        {newPasswordErrors[key] ? (
                                            <p className={style.passwordErrors__item}>
                                                <span
                                                    className={style.passwordErrors__dot}
                                                />
                                                {newPasswordErrors[key]}
                                            </p>
                                        ) : null}
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={style.form__inputContainer}>
                        <Field
                            id="repeatPassword"
                            type="password"
                            name="repeatPassword"
                            labelText={t('confirmNewPassword')}
                            value={repeatPassword}
                            onChange={inputOnChange}
                            inputStyle={style.form__input}
                            labelStyle={style.form__label}
                            labelStyleActive={style.form__labelActive}
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
                    <div className={style.buttonWrapper}>
                        <Button
                            type="submit"
                            disabled={isDisabled}
                            className={style.buttonWrapper__button}
                            onClick={submitNewPassword}
                            loading={loading}
                        >
                            <div>{t('changePassword')}</div>
                        </Button>
                    </div>
                </form>
                <div className={style.passwordErrors__desctop}>
                    <div className={newpasswordErrorStyle}>
                        <p className={style.passwordErrors__desctop_title}>
                            {t('passwordStrength')}
                        </p>
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
                </div>
            </div>
        </div>
    );
};

SecurityView.defaultProps = {
    inputOnChange: () => {},
    submitNewPassword: () => {},
    newPasswordErrors: {},
    isNewPasswordError: false,
    loading: false,
    isDisabled: true,
    newPassword: '',
    oldPassword: '',
    repeatPassword: '',
    passwordDoesntMatch: '',
    oldPasswordLength: '',
};

SecurityView.propTypes = {
    inputOnChange: PropTypes.func,
    submitNewPassword: PropTypes.func,
    newPasswordErrors: PropTypes.object,
    isNewPasswordError: PropTypes.bool,
    loading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    newPassword: PropTypes.string,
    oldPassword: PropTypes.string,
    repeatPassword: PropTypes.string,
    passwordDoesntMatch: PropTypes.string,
    oldPasswordLength: PropTypes.string,
};

export default SecurityView;
