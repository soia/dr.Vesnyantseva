import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import ImagesOnScroll from './images-on-scroll';
import Education from './education';
import ImagesSlider from './images-slider';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <ImagesOnScroll />
        <Education />
        <ImagesSlider />
    </Fragment>
);

export default HomePage;
