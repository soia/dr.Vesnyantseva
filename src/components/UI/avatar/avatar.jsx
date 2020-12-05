import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Avatar from 'react-avatar';
import style from './avatar.module.scss';

const AvatarComponent = ({
    className,
    userName,
    src,
    alt,
    width,
    height,
    ...args
}) => {
    if (!src) {
        return (
            <div className={style.avatar}>
                <Avatar className={classNames(className, style.logo)} unstyled name={userName} />
            </div>
        );
    }
    return (
        <div className={style.avatar}>
            <img {...args} className={classNames(className, style.logoAvatar)} src={src} alt={alt} />
        </div>
    );
};

AvatarComponent.defaultProps = {
    className: '',
    userName: '',
    src: '',
    alt: '',
    width: '',
    height: '',
    onClick: () => {},
};

AvatarComponent.propTypes = {
    className: PropTypes.string,
    userName: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    onClick: PropTypes.func,
};

export default AvatarComponent;
