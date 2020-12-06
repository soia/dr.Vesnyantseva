import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({
    count, width, wrapper: Wrapper, height, circle, margin,
}) => {
    const elements = [];

    for (let i = 0; i < count; i++) {
        const style = {
            margin,
        };

        if (width !== null) {
            style.width = width;
        }

        if (height !== null) {
            style.height = height;
        }

        if (width !== null && height !== null && circle) {
            style.borderRadius = '100%';
        }

        elements.push(
            <span key={i} className="skeleton" style={style}>
                &zwnj;
            </span>,
        );
    }

    return (
        <span>
            {Wrapper
                ? elements.map(element => (
                    <Wrapper key={element}>
                        {element}
                          &zwnj;
                    </Wrapper>
                ))
                : elements}
        </span>
    );
};

Skeleton.defaultProps = {
    count: 1,
    width: null,
    wrapper: null,
    height: null,
    circle: false,
    margin: 0,
};

Skeleton.propTypes = {
    count: PropTypes.any,
    width: PropTypes.any,
    wrapper: PropTypes.any,
    height: PropTypes.any,
    circle: PropTypes.any,
    margin: PropTypes.any,
};
export default Skeleton;
