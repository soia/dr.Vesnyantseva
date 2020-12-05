/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './field.module.scss';
import visibleIcon from '../../assets/images/icons/visible_icon.svg';
import hideIcon from '../../assets/images/icons/hidden_icon.svg';

class Field extends Component {
    state = {
        focused: false,
        inputType: '',
        isVisibleEye: false,
    };

    componentDidMount() {
        const { type } = this.props;
        this.setState({
            inputType: type,
        });
    }

    onBlur = () => {
        this.setState({ focused: false });
    };

    onFocus = () => {
        this.setState({ focused: true });
    };

    switchEye = () => {
        const { inputType } = this.state;
        if (inputType === 'text') {
            this.setState({
                inputType: 'password',
                isVisibleEye: false,
            });
        }

        if (inputType === 'password') {
            this.setState({
                inputType: 'text',
                isVisibleEye: true,
            });
        }
    };

    render() {
        const {
            id,
            labelText,
            type,
            placeholder,
            value,
            onChange,
            onKeyDown,
            name,
            inputStyle,
            labelStyle,
            labelStyleActive,
            min,
            max,
            disabled,
            step,
            icon,
            error,
        } = this.props;
        const { focused, inputType, isVisibleEye } = this.state;

        const labelClassNames = focused || value.length
            ? classNames(
                style.container__inputWrrapper_label,
                style.container__inputWrrapper_labelActive,
                labelStyleActive,
            )
            : classNames(
                style.container__inputWrrapper_label,
                labelStyle,
            );

        const inputClassNames = error
            ? classNames(
                style.container__inputWrrapper_input,
                style.container__inputWrrapper_inputError,
                inputStyle,
            )
            : classNames(style.container__inputWrrapper_input, inputStyle);


        const eye = isVisibleEye ? (
            <img className={style.container__eye} src={hideIcon} alt="icon" />
        ) : (
            <img className={style.container__eye} src={visibleIcon} alt="icon" />
        );

        return (
            <div className={style.container}>
                <label className={labelClassNames} htmlFor={id}>
                    {labelText}
                </label>
                <div className={style.container__inputWrrapper}>
                    {icon}
                    <input
                        id={id}
                        type={inputType}
                        className={inputClassNames}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        name={name}
                        maxlenth="80"
                        min={min}
                        max={max}
                        autoComplete="off"
                        disabled={disabled}
                        step={step}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                </div>
                {type === 'password' ? <div onClick={this.switchEye}>{eye}</div> : null}
            </div>
        );
    }
}

Field.defaultProps = {
    labelText: '',
    placeholder: '',
    value: '',
    name: '',
    min: 0,
    inputStyle: '',
    labelStyle: '',
    labelStyleActive: '',
    step: '',
    onChange: () => {},
    disabled: false,
    error: false,
    icon: '',
};

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.string,
    inputStyle: PropTypes.string,
    labelStyle: PropTypes.string,
    labelStyleActive: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    icon: PropTypes.any,
};

export default Field;
