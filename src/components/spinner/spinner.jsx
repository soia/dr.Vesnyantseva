import React from 'react';
import spinnerImg from '../assets/images/spinner.svg';
import style from './spinner.module.scss';

const Spinner = () => (
    <div className={style.spinnerWrapper}>
        <img className={style.spinner} src={spinnerImg} alt="spinner" />
    </div>
);

export default Spinner;
