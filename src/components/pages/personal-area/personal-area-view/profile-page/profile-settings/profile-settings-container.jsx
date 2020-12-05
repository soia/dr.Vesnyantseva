import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withPostService from '../../../../../hoc/with-post-service';
import ProfileSettingsView from './profile-settings-view';
import fetchUpdateProfileAction from '../../../../../../actions/put-update-profile.actions';
import fetchDeleteAvatarAction from '../../../../../../actions/delete-user-avatar.actions';
import { compose } from '../../../../../../utils';
import { emailValid, masterNodeValidation } from '../../../../../../helpers';

export class ProfileSettings extends Component {
    static defaultProps = {
        t: () => {},
        fetchDeleteAvatar: () => {},
        fetchUpdateProfile: () => {},
        user: {},
        updateProfileLoad: false,
        success: false,
    };

    static propTypes = {
        t: PropTypes.func,
        fetchDeleteAvatar: PropTypes.func,
        fetchUpdateProfile: PropTypes.func,
        user: PropTypes.object,
        updateProfileLoad: PropTypes.bool,
        success: PropTypes.bool,
    };

    state = {
        profileData: {
            login: '',
            fullName: '',
            email: '',
            masterNodeAddress: '',
            publicProfileBio: '',
        },
        loginError: '',
        fullNameError: '',
        emailError: '',
        masterNodeAddressError: '',
        publicProfileBioError: '',
        isDisabled: true,
    };

    componentDidMount() {
        const {
            user: {
                login, fullName, email, masterNodeAddress, publicProfileBio,
            },
        } = this.props;

        this.setState({
            profileData: {
                login,
                fullName,
                email,
                masterNodeAddress,
                publicProfileBio,
            },
        });
    }

    componentDidUpdate(prevProps) {
        const { success } = this.props;

        if (success && success !== prevProps.success) {
            this.setState({
                isDisabled: true,
            });
        }
    }

    inputOnChange = async event => {
        const { name, value } = event.target;

        if (name === 'email') {
            await this.emailValidation(name, value);
        }

        if (name === 'login') {
            await this.loginValidation(name, value);
        }
        if (name === 'fullName') {
            await this.fullNameValidation(name, value);
        }
        if (name === 'masterNodeAddress') {
            await this.masterNodeAddressValidation(name, value);
        }
        if (name === 'publicProfileBio') {
            await this.publicProfileBioValidation(name, value);
        }

        this.checkDisableButton();
    };

    loginValidation = (name, value) => {
        const { t } = this.props;
        const { profileData } = this.state;
        const validationRule = value.length > 2;
        const errorText = validationRule ? '' : t('error.min_length', { digit: 3 });

        this.setState({
            profileData: {
                ...profileData,
                [name]: value,
            },
            [`${name}Error`]: errorText,
        });
    };

    fullNameValidation = (name, value) => {
        const { t } = this.props;
        const { profileData } = this.state;
        const validationRule = value.length > 2 || value.length === 0;
        const errorText = validationRule ? '' : t('error.min_length', { digit: 3 });

        this.setState({
            profileData: {
                ...profileData,
                [name]: value,
            },
            [`${name}Error`]: errorText,
        });
    };

    masterNodeAddressValidation = (name, value) => {
        const { t } = this.props;
        const { profileData } = this.state;
        const isError = masterNodeValidation(value);
        const errorText = isError && value.length ? t('error.wrongAddress') : '';

        this.setState({
            profileData: {
                ...profileData,
                [name]: value.trim(),
            },
            [`${name}Error`]: errorText,
        });
    };

    publicProfileBioValidation = (name, value) => {
        const { t } = this.props;
        const { profileData } = this.state;
        const validationRule = value.length > 2 || value.length === 0;
        const errorText = validationRule ? '' : t('error.min_length', { digit: 3 });

        this.setState({
            profileData: {
                ...profileData,
                [name]: value,
            },
            [`${name}Error`]: errorText,
        });
    };

    emailValidation = (name, value) => {
        const { t } = this.props;
        const { profileData } = this.state;
        this.setState({
            profileData: {
                ...profileData,
                [name]: value.trim(),
            },
            emailError: emailValid(value) ? t('error.wrong_email') : '',
        });
    };

    checkDisableButton = () => {
        const {
            loginError,
            fullNameError,
            emailError,
            publicProfileBioError,
            masterNodeAddressError,
            profileData: {
                login, fullName, email, masterNodeAddress, publicProfileBio,
            },
        } = this.state;
        const {
            user: {
                login: loginProps,
                fullName: fullNameProps,
                email: emailProps,
                masterNodeAddress: masterNodeAddressProps,
                publicProfileBio: publicProfileBioProps,
            },
        } = this.props;
        const errorArray = [
            loginError,
            fullNameError,
            emailError,
            publicProfileBioError,
            masterNodeAddressError,
        ];
        const isError = errorArray.every(elem => elem === '');
        const dataNotChanged = login === loginProps
            && fullName === fullNameProps
            && email === emailProps
            && masterNodeAddress === masterNodeAddressProps
            && publicProfileBio === publicProfileBioProps;

        this.setState({
            isDisabled: !isError || dataNotChanged,
        });
    };

    submitForm = event => {
        event.preventDefault();
        const { isDisabled, profileData } = this.state;
        const { t, fetchUpdateProfile } = this.props;

        if (!isDisabled) {
            fetchUpdateProfile(profileData, t);
        }
    };

    deleteAvatar = event => {
        event.stopPropagation();
        const { t, fetchDeleteAvatar } = this.props;
        fetchDeleteAvatar(t);
    };

    render() {
        const {
            profileData,
            loginError,
            fullNameError,
            emailError,
            publicProfileBioError,
            masterNodeAddressError,
            isDisabled,
        } = this.state;

        const { updateProfileLoad, user } = this.props;

        return (
            <ProfileSettingsView
                profileData={profileData}
                loginError={loginError}
                fullNameError={fullNameError}
                emailError={emailError}
                publicProfileBioError={publicProfileBioError}
                masterNodeAddressError={masterNodeAddressError}
                user={user}
                inputOnChange={this.inputOnChange}
                submitForm={this.submitForm}
                deleteAvatar={this.deleteAvatar}
                isDisabled={isDisabled}
                updateProfileLoad={updateProfileLoad}
            />
        );
    }
}

const mapStateToProps = state => {
    const {
        authentication: { user },
        updateProfile: { loading: updateProfileLoad, success },
    } = state;

    return {
        user,
        updateProfileLoad,
        success,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        fetchDeleteAvatar: fetchDeleteAvatarAction(postService),
        fetchUpdateProfile: fetchUpdateProfileAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
)(ProfileSettings);
