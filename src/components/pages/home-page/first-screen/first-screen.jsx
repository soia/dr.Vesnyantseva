/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import video from './video.MOV';
import style from './first-screen.module.scss';

const FirstScreen = () => (
    <div className={style.firstScreen}>
        <video loop autoPlay muted>
            <source src={video} type="video/mp4" />
        </video>
    </div>
);

export default FirstScreen;
