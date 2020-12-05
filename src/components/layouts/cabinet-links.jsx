import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from '../../utils';
import logoutAction from '../../actions/logout.actions';
import profileIcon from '../assets/images/menu-icons/profile-icon.svg';
import searchIcon from '../assets/images/menu-icons/search-icon.svg';
import bankIcon from '../assets/images/menu-icons/bank-icon.svg';
import gearIcon from '../assets/images/menu-icons/gear-icon.svg';
import laptopIcon from '../assets/images/menu-icons/laptop-icon.svg';
import logoutIcon from '../assets/images/menu-icons/logout-icon.svg';
import {
    profilePath,
    watchListPath,
    txnPrivateNotesPath,
    apiKeysPath,
    masterNodeValidatorPath,
} from '../../constants';

const CabinetLinks = ({
    onClick, dispatch, history, containerStyle, linkStyle,
}) => {
    const { t } = useTranslation();

    const data = [
        {
            path: profilePath,
            title: t('profile'),
            icon: profileIcon,
        },
        {
            path: watchListPath,
            title: t('watchList'),
            icon: searchIcon,
        },
        {
            path: txnPrivateNotesPath,
            title: t('txnPrivateNotes'),
            icon: bankIcon,
        },
        {
            path: apiKeysPath,
            title: t('apiKeys'),
            icon: gearIcon,
        },
        {
            path: masterNodeValidatorPath,
            title: t('masterNodeValidator'),
            icon: laptopIcon,
        },
    ];

    return (
        <div id="aside">
            <div className={containerStyle}>
                {data.map(item => {
                    const { path, icon, title } = item;

                    return (
                        <NavLink
                            onClick={onClick}
                            key={title}
                            to={path}
                            className={linkStyle}
                        >
                            <img src={icon} alt="icon" />
                            {title}
                        </NavLink>
                    );
                })}
            </div>
            <div onClick={() => dispatch(logoutAction(history))} className={linkStyle}>
                <img src={logoutIcon} alt="icon" />
                {t('logout')}
            </div>
        </div>
    );
};

CabinetLinks.defaultProps = {
    onClick: () => {},
    dispatch: () => {},
    history: {},
    containerStyle: '',
    linkStyle: '',
};

CabinetLinks.propTypes = {
    onClick: () => {},
    dispatch: () => {},
    history: PropTypes.object,
    containerStyle: PropTypes.string,
    linkStyle: PropTypes.string,
};

const mapStateToProps = state => {
    const {
        authentication: { loggingIn },
    } = state;

    return {
        loggingIn,
    };
};

export default compose(connect(mapStateToProps), withRouter)(CabinetLinks);
