import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spin, Icon } from 'antd';
import styles from './button.module.scss';

const Button = props => {
    const {
        id,
        type,
        value,
        onClick,
        name,
        className,
        children,
        style,
        loading,
        disabled,
    } = props;

    let buttonClassNames = classNames(styles.button, className);

    if (loading) {
        buttonClassNames = classNames(styles.button, styles.button__loading, className);
    }

    if (disabled) {
        buttonClassNames = classNames(styles.button, styles.button__disabled, className);
    }

    const antIcon = <Icon type="loading" spin />;

    return (
        <Fragment>
            <button
                id={id}
                type={type}
                disabled={disabled}
                name={name}
                value={value}
                className={buttonClassNames}
                style={style}
                onClick={onClick}
            >
                {loading ? (
                    <span>
                        <Spin indicator={antIcon} />
                    </span>
                ) : children}
            </button>
        </Fragment>
    );
};

Button.defaultProps = {
    id: '',
    value: '',
    name: '',
    className: '',
    loading: false,
    disabled: false,
    children: '',
    style: {},
    onClick: () => {},
};

Button.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    name: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
};

export default Button;
