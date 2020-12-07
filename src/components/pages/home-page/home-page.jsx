import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import ImagesOnScroll from './images-on-scroll';
import Education from './education';
import CardSlider from './cards-slider';
import StickySlider from './sticky-slider';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <ImagesOnScroll />
        <Education />
        <CardSlider />
        <StickySlider />
        <Education />
    </Fragment>
);

export default HomePage;
