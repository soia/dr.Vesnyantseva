import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import ImagesOnScroll from './images-on-scroll';
import Education from './education';
import StickySlider from './sticky-slider';
import Boxes from './boxes';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <Education />
        <Boxes />
        <StickySlider />
        <ImagesOnScroll />
    </Fragment>
);

export default HomePage;
