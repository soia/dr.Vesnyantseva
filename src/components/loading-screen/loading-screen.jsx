import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import logo from '../assets/images/logos/white-logo.svg';
import style from './loading-screen.module.scss';

const LoadingScreen = ({ loading }) => {
    const containerStyle = loading
        ? style.loading
        : classNames(style.loading, style.loaded);

    return (
        <div className={containerStyle}>
            <img src={logo} alt="logo" />
            <div className={style.spinner}>
                <div className={style.dot1} />
                <div className={style.dot2} />
            </div>
        </div>
    );
};

LoadingScreen.defaultProps = {
    loading: true,
};

LoadingScreen.propTypes = {
    loading: PropTypes.bool,
};

export default LoadingScreen;
