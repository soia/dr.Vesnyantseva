/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { useTrail, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import style from './blog.module.scss';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const Blog = () => {
    const { t } = useTranslation();
    const [trail, set] = useTrail(3, () => ({
        xy: [0, 0],
        config: i => (i === 0 ? fast : slow),
    }));

    return (
        <Fragment>
            <div className={style.blog} id="blog">
                <h3 className={style.blog__title}>{t('blog')}</h3>
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <filter id="goo">
                        <feGaussianBlur
                            in="SourceGraphic"
                            result="blur"
                            stdDeviation="30"
                        />
                        <feColorMatrix
                            in="blur"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7"
                        />
                    </filter>
                </svg>
                <div
                    className="hooks-main"
                    onMouseMove={e => set({ xy: [e.clientX, e.clientY] })}
                >
                    {trail.map((props, index) => (
                        <animated.div
                            key={index}
                            style={{ transform: props.xy.interpolate(trans) }}
                        />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

Blog.defaultProps = {
    xy: {},
};

Blog.propTypes = {
    xy: PropTypes.object,
};

export default Blog;
