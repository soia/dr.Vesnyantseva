import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './style.module.scss';
import './background.scss';

const Gallery = () => {
    const { t } = useTranslation();

    return (
        <div className={style.container} id="gallery">
            <div className={style.wrapper}>
                <h3 className={style.wrapper__title}>{t('gallery')}</h3>
            </div>

            <link
                href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
                rel="stylesheet"
                type="text/css"
            />
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
        </div>
    );
};

export default Gallery;
