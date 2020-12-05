import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Dropzone from '../drop-zone/drop-zone';
import Button from '../../../../../UI/button/button';
import InfoIcon from '../../../../../assets/images/icons/info_icon';
import Field from '../../../../../UI/field/field';
import style from './profile-settings.module.scss';

const ProfileSettingsView = ({
    profileData: {
        login,
        fullName,
        email,
        masterNodeAddress,
        publicProfileBio,
    },
    loginError,
    fullNameError,
    emailError,
    masterNodeAddressError,
    publicProfileBioError,
    user,
    inputOnChange,
    submitForm,
    deleteAvatar,
    updateProfileLoad,
    isDisabled,
}) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className={style.profileSettings}>
                <form className={style.profileSettings__form} onSubmit={submitForm}>
                    <div className={style.profileSettings__form_inputContainer}>
                        <Field
                            id="login"
                            type="text"
                            name="login"
                            labelText={t('username')}
                            value={login}
                            onChange={inputOnChange}
                            inputStyle={style.profileSettings__form_input}
                            labelStyle={style.profileSettings__form_label}
                            labelStyleActive={style.profileSettings__form_labelActive}
                        />
                        {loginError ? (
                            <div className={style.profileSettings__form__error}>
                                <InfoIcon className={style.profileSettings__form__error_icon} />
                                <p className={style.profileSettings__form__error_text}>
                                    {loginError}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.profileSettings__form_inputContainer}>
                        <Field
                            id="fullName"
                            type="text"
                            name="fullName"
                            labelText={t('fullName')}
                            value={fullName}
                            onChange={inputOnChange}
                            inputStyle={style.profileSettings__form_input}
                            labelStyle={style.profileSettings__form_label}
                            labelStyleActive={style.profileSettings__form_labelActive}
                        />
                        {fullNameError ? (
                            <div className={style.profileSettings__form__error}>
                                <InfoIcon className={style.profileSettings__form__error_icon} />
                                <p className={style.profileSettings__form__error_text}>
                                    {fullNameError}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.profileSettings__form_inputContainer}>
                        <Field
                            id="email"
                            type="email"
                            name="email"
                            labelText={t('emailAddress')}
                            value={email}
                            onChange={inputOnChange}
                            inputStyle={style.profileSettings__form_input}
                            labelStyle={style.profileSettings__form_label}
                            labelStyleActive={style.profileSettings__form_labelActive}
                        />
                        {emailError ? (
                            <div className={style.profileSettings__form__error}>
                                <InfoIcon className={style.profileSettings__form__error_icon} />
                                <p className={style.profileSettings__form__error_text}>
                                    {emailError}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.profileSettings__form_inputContainer}>
                        <Field
                            id="masterNodeAddress"
                            type="text"
                            name="masterNodeAddress"
                            labelText={t('masterNodeAddress')}
                            value={masterNodeAddress}
                            onChange={inputOnChange}
                            inputStyle={style.profileSettings__form_input}
                            labelStyle={style.profileSettings__form_label}
                            labelStyleActive={style.profileSettings__form_labelActive}
                        />
                        {masterNodeAddressError ? (
                            <div className={style.profileSettings__form__error}>
                                <InfoIcon className={style.profileSettings__form__error_icon} />
                                <p className={style.profileSettings__form__error_text}>
                                    {masterNodeAddressError}
                                </p>
                            </div>
                        ) : null}
                    </div>
                    <div className={style.profileSettings__form_inputContainer}>
                        <Field
                            id="publicProfileBio"
                            type="text"
                            name="publicProfileBio"
                            labelText={t('publicProfileBio')}
                            value={publicProfileBio}
                            onChange={inputOnChange}
                            inputStyle={style.profileSettings__form_input}
                            labelStyle={style.profileSettings__form_label}
                            labelStyleActive={style.profileSettings__form_labelActive}
                        />
                        {publicProfileBioError ? (
                            <div className={style.profileSettings__form__error}>
                                <InfoIcon className={style.profileSettings__form__error_icon} />
                                <p className={style.profileSettings__form__error_text}>
                                    {publicProfileBioError}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </form>
                <div className={style.rightSide}>
                    <Dropzone user={user} deleteAvatar={deleteAvatar} />
                    <div>
                        <p className={style.rightSide__bottom}>
                            {t('avatarFormat')}
                        </p>
                        <p className={style.rightSide__bottom}>
                            {t('avatarSize')}
                        </p>
                        <p className={style.rightSide__bottom}>
                            {t('avatarMaxWeight')}
                        </p>
                    </div>
                </div>
            </div>
            <div className={style.buttonWrapper}>
                <Button
                    type="submit"
                    disabled={isDisabled}
                    className={style.buttonWrapper__button}
                    onClick={submitForm}
                    loading={updateProfileLoad}
                >
                    <div>
                        {t('save')}
                    </div>
                </Button>
            </div>
        </Fragment>
    );
};

ProfileSettingsView.defaultProps = {
    profileData: {},
    loginError: '',
    fullNameError: '',
    emailError: '',
    masterNodeAddressError: '',
    publicProfileBioError: '',
    user: {},
    inputOnChange: () => {},
    submitForm: () => {},
    deleteAvatar: () => {},
    updateProfileLoad: false,
    isDisabled: true,
};

ProfileSettingsView.propTypes = {
    profileData: PropTypes.object,
    loginError: PropTypes.string,
    fullNameError: PropTypes.string,
    emailError: PropTypes.string,
    masterNodeAddressError: PropTypes.string,
    publicProfileBioError: PropTypes.string,
    user: PropTypes.object,
    inputOnChange: PropTypes.func,
    submitForm: PropTypes.func,
    deleteAvatar: PropTypes.func,
    updateProfileLoad: PropTypes.bool,
    isDisabled: PropTypes.bool,
};

export default ProfileSettingsView;
