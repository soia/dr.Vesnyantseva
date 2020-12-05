import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeftIcon = ({ className }) => (
    <svg
        className={className}
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8 11L2 6.5L8 2"
            stroke="#FF2911"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

ArrowLeftIcon.defaultProps = {
    className: '',
};

ArrowLeftIcon.propTypes = {
    className: PropTypes.string,
};

export default ArrowLeftIcon;
