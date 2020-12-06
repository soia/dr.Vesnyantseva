import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import ImagesOnScroll from './images-on-scroll';
import Education from './education';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <ImagesOnScroll />
        <Education />
    </Fragment>
);

export default HomePage;
