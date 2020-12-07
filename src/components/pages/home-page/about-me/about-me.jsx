/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { useTrail, animated } from 'react-spring';
import PropTypes from 'prop-types';
import portret from '../../../assets/images/portrets/portret.png';
import signature from '../../../assets/images/portrets/signature.png';
import style from './about-me.module.scss';

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 10, tension: 200, friction: 50 };
const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

const AboutMe = () => {
    const [trail, set] = useTrail(3, () => ({
        xy: [0, 0],
        config: i => (i === 0 ? fast : slow),
    }));

    return (
        <Fragment>
            <div className={style.aboutMe} id="aboutMe">
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
                <div className={style.letter}>
                    <img className={style.letter__portret} src={portret} alt="portret" />
                    <h3 className={style.letter__title}>Hello!</h3>
                    <p className={style.letter__text}>
                        Im a dentist who fears going to the dentist.
                    </p>
                    <p className={style.letter__text}>
                        My fear gave birth to a dream. What if I could create a dental
                        practice that I would love to visit, that patients would love to
                        visit?
                    </p>
                    <p className={style.letter__text}>
                        Eventually my dream grew big enough to inspire courage and I put
                        pen to paper. Two months and 45 pages later, Smile & Co. was born.
                    </p>
                    <p className={style.letter__text}>Dentistry, differently.</p>
                    <p className={style.letter__text}>
                        No white coats. No judgments. No pressure. A place where we take
                        dentistry seriously, but not ourselves. A place to laugh, have
                        fun, and be family.
                    </p>
                    <div className={style.letter__sine}>
                        <img src={signature} alt="signature" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

AboutMe.defaultProps = {
    xy: {},
};

AboutMe.propTypes = {
    xy: PropTypes.object,
};

export default AboutMe;
