import React from 'react';
import PropTypes from 'prop-types';

const ArrowLeftIcon = ({ className }) => (
    <svg
        className={className}
        width="5"
        height="8"
        viewBox="0 0 5 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            opacity="0.5"
            d="M4.29206 0.151959C4.24401 0.10379 4.18693 0.0655736 4.12409 0.0394979C4.06125 0.0134222 3.99388 0 3.92585 0C3.85781 0 3.79045 0.0134222 3.72761 0.0394979C3.66477 0.0655736 3.60769 0.10379 3.55964 0.151959L0.121012 3.59059C0.0826515 3.62887 0.052218 3.67434 0.0314532 3.7244C0.0106884 3.77446 0 3.82812 0 3.88231C0 3.93651 0.0106884 3.99017 0.0314532 4.04023C0.052218 4.09028 0.0826515 4.13576 0.121012 4.17404L3.55964 7.61267C3.7624 7.81542 4.0893 7.81542 4.29206 7.61267C4.49481 7.40991 4.49481 7.08301 4.29206 6.88025L1.29619 3.88024L4.29619 0.880237C4.49481 0.681616 4.49481 0.350581 4.29206 0.151959Z"
            fill="#262642"
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
