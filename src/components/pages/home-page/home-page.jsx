import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import Education from './education';
import StickySlider from './sticky-slider';
import Boxes from './boxes';
import Gallery from './gallery';
import Blog from './blog';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <Education />
        <StickySlider />
        <Blog />
        <Gallery />
        <Boxes />
    </Fragment>
);

export default HomePage;
