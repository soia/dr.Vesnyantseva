import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from '../../../utils';
import PersonalAreaContainer from './personal-area-container';

const PersonalArea = ({ loggingIn }) => {
    if (loggingIn) {
        return <PersonalAreaContainer />;
    }

    return <Redirect to="/" />;
};

const mapStateToProps = state => {
    const {
        authentication: { loggingIn },
    } = state;

    return {
        loggingIn,
    };
};

PersonalArea.defaultProps = {
    loggingIn: false,
};

PersonalArea.propTypes = {
    loggingIn: PropTypes.bool,
};
export default compose(connect(mapStateToProps))(PersonalArea);
