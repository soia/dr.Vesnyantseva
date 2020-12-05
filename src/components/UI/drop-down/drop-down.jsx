/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '../../assets/images/icons/arrow-down-icon';
import style from './drop-down.module.scss';

const DropDown = ({ placeholder, dropDownList, onClick }) => (
    <div className={style.dropdown}>
        <p className={style.dropdown_text}>{placeholder}</p>
        <ArrowDownIcon className={style.dropdown_arrowDown} />
        <div className={style.dropdown__menu}>
            <ul>
                {dropDownList.map(item => {
                    const { value } = item;

                    return (
                        <li key={value} onClick={() => onClick(value)}>
                            {value}
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
);

DropDown.defaultProps = {
    onClick: () => {},
    placeholder: '',
    dropDownList: [],
};

DropDown.propTypes = {
    onClick: PropTypes.func,
    placeholder: PropTypes.any,
    dropDownList: PropTypes.instanceOf(Array),
};

export default DropDown;
