/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import style from './about-me.module.scss';

const FirstScreen = () => (
    <div className={style.firstScreen}>
        <video loop autoPlay muted>
            <source src={video} type="video/mp4" />
        </video>
    </div>
);

export default FirstScreen;
