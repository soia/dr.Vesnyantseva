/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import setIcon from './images/setIcon.png';
import style from './boxes.module.scss';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans4 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;
const trans5 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`;

const Boxes = () => {
    const { t } = useTranslation();
    const [props, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));

    return (
        <div className={style.boxes} id="boxes">
            <div className={style.boxes__leftSide}>
                <h3 className={style.boxes__title}>{t('healthBox')}</h3>
                <p className={style.boxes__subTitle}>{t('giveOralCare')}</p>
                <img className={style.boxes__leftSide_img} src={setIcon} alt="setIcon" />
                <div className={style.boxes__buttonWr}>
                    <Link to="/">{t('moreDetails')}</Link>
                    <button type="button">{t('buy')}</button>
                </div>
            </div>
            <div
                className={style.container}
                onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
            >
                <animated.div
                    className={style.card1}
                    style={{ transform: props.xy.interpolate(trans1) }}
                />
                <animated.div
                    className={style.card2}
                    style={{ transform: props.xy.interpolate(trans2) }}
                />
                <animated.div
                    className={style.card3}
                    style={{ transform: props.xy.interpolate(trans3) }}
                />
                <animated.div
                    className={style.card4}
                    style={{ transform: props.xy.interpolate(trans4) }}
                />
                <animated.div
                    className={style.card5}
                    style={{ transform: props.xy.interpolate(trans5) }}
                />
            </div>
        </div>
    );
};

Boxes.defaultProps = {
    xy: {},
};

Boxes.propTypes = {
    xy: PropTypes.object,
};

export default Boxes;
