import React from 'react';
import { useTranslation } from 'react-i18next';
import Coverflow from 'react-coverflow';
import Slider from 'react-slick';
import img1 from './images/1.jpeg';
import img2 from './images/2.JPG';
import img3 from './images/3.JPG';
import img4 from './images/4.JPG';
import img5 from './images/5.JPG';
import img6 from './images/6.JPG';
import img7 from './images/7.JPG';
import img8 from './images/8.JPG';
import img9 from './images/9.JPG';
import img10 from './images/10.JPG';
import img11 from './images/11.JPG';
import img12 from './images/12.JPG';
import img13 from './images/13.JPG';
import img14 from './images/14.JPG';
import img15 from './images/15.jpeg';
import img16 from './images/16.jpeg';
import img17 from './images/17.jpeg';
import img18 from './images/18.jpeg';
import img19 from './images/19.jpeg';
import img20 from './images/20.jpeg';
import img21 from './images/21.jpeg';
import style from './style.module.scss';
import './background.scss';

const Gallery = () => {
    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        centerPadding: '60px',
    };

    const gallery = [
        {
            img: img1,
            title: 'Какой-то текст',
        },
        {
            img: img2,
            title: 'Какой-то текст',
        },
        {
            img: img3,
            title: 'Какой-то текст',
        },
        {
            img: img4,
            title: 'Какой-то текст',
        },
        {
            img: img5,
            title: 'Какой-то текст',
        },
        {
            img: img6,
            title: 'Какой-то текст',
        },
        {
            img: img7,
            title: 'Какой-то текст',
        },
        {
            img: img8,
            title: 'Какой-то текст',
        },
        {
            img: img9,
            title: 'Какой-то текст',
        },

        {
            img: img10,
            title: 'Какой-то текст',
        },
        {
            img: img11,
            title: 'Какой-то текст',
        },
        {
            img: img12,
            title: 'Какой-то текст',
        },
        {
            img: img13,
            title: 'Какой-то текст',
        },
        {
            img: img14,
            title: 'Какой-то текст',
        },
        {
            img: img15,
            title: 'Какой-то текст',
        },
        {
            img: img16,
            title: 'Какой-то текст',
        },
        {
            img: img17,
            title: 'Какой-то текст',
        },
        {
            img: img18,
            title: 'Какой-то текст',
        },
        {
            img: img19,
            title: 'Какой-то текст',
        },
        {
            img: img20,
            title: 'Какой-то текст',
        },
        {
            img: img21,
            title: 'Какой-то текст',
        },
    ];

    const desctopWidth = window.innerWidth > 1024;

    return (
        <div className={style.container} id="gallery">
            <div className={style.wrapper}>
                <h3 className={style.wrapper__title}>{t('gallery')}</h3>
            </div>

            {desctopWidth ? (
                <div className={style.slider}>
                    <Coverflow
                        displayQuantityOfSide={2}
                        navigation={false}
                        enableScroll={false}
                        clickable
                        infiniteScroll
                        active={0}
                    >
                        {gallery.map(item => {
                            const { img, title } = item;

                            return <img key={img} src={img} alt={title} />;
                        })}
                    </Coverflow>
                </div>
            ) : (
                <Slider {...settings}>
                    {gallery.map(item => {
                        const { img, title } = item;
                        return <img key={img} src={img} alt={title} />;
                    })}
                </Slider>
            )}

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
