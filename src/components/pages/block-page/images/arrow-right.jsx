import React from 'react';
import PropTypes from 'prop-types';

const ArrowRightIcon = ({ className }) => (
    <svg
        className={className}
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2 2L8 6.5L2 11"
            stroke="#FF2911"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

ArrowRightIcon.defaultProps = {
    className: '',
};

ArrowRightIcon.propTypes = {
    className: PropTypes.string,
};

export default ArrowRightIcon;
