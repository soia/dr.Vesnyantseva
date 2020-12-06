import React, { Fragment } from 'react';
import FirstScreen from './first-screen';
import AboutMe from './about-me';
import Education from './education';

const HomePage = () => (
    <Fragment>
        <FirstScreen />
        <AboutMe />
        <Education />
    </Fragment>
);

export default HomePage;
