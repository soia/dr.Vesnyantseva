/* eslint-disable */
import React, { useState,useEffect } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import Particles from 'react-particles-js';
import { useTranslation } from 'react-i18next';
import diplom1 from './images/diplom.jpg';
import diplom2 from './images/diplom2.jpg';
import diplom3 from './images/diplom3.jpg';
import diplom4 from './images/diplom4.jpg';
import style from './style.module.scss';

const cards = [
    diplom1,
    diplom4,
    diplom3,
    diplom2,
    diplom1,
];

const to = i => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
});
const from = () => ({
    x: 0,
    rot: 0,
    scale: 1.5,
    y: -1000,
});

const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r /
        10}deg) rotateZ(${r}deg) scale(${s})`;

const Education = () => {
    const { t } = useTranslation();
    const [gone] = useState(() => new Set());
    const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }));
    const [active, setActive] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 500);
    }, []);
    const bind = useGesture(
        ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
            const trigger = velocity > 0.2;
            const dir = xDir < 0 ? -1 : 1;
            if (!down && trigger) gone.add(index);
            set(i => {
                if (index !== i) return;
                const isGone = gone.has(index);
                const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;
                const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
                const scale = down ? 1.1 : 1;
                return {
                    x,
                    rot,
                    scale,
                    delay: undefined,
                    config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
                };
            });
            if (!down && gone.size === cards.length) {
                setTimeout(() => gone.clear() || set(i => to(i)), 600);
            }
        },
    );

    return (
        <div className={style.container} id="education">
            {active ? (
                <Particles
                    params={{
                        particles: {
                            number: {
                                value: 80,
                                density: {
                                    enable: true,
                                    value_area: 800,
                                },
                            },
                            color: {
                                value: '#ffffff',
                            },
                            shape: {
                                type: 'circle',
                                stroke: {
                                    width: 0,
                                    color: '#000000',
                                },
                                polygon: {
                                    nb_sides: 5,
                                },
                                image: {
                                    src: 'img/github.svg',
                                    width: 100,
                                    height: 100,
                                },
                            },
                            opacity: {
                                value: 0.5,
                                random: false,
                                anim: {
                                    enable: false,
                                    speed: 1,
                                    opacity_min: 0.1,
                                    sync: false,
                                },
                            },
                            size: {
                                value: 3,
                                random: true,
                                anim: {
                                    enable: false,
                                    speed: 40,
                                    size_min: 0.1,
                                    sync: false,
                                },
                            },
                            line_linked: {
                                enable: true,
                                distance: 150,
                                color: '#ffffff',
                                opacity: 0.4,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 6,
                                direction: 'none',
                                random: false,
                                straight: false,
                                out_mode: 'out',
                                bounce: false,
                                attract: {
                                    enable: false,
                                    rotateX: 600,
                                    rotateY: 1200,
                                },
                            },
                        },
                        interactivity: {
                            detect_on: 'canvas',
                            events: {
                                onhover: {
                                    enable: true,
                                    mode: 'repulse',
                                },
                                onclick: {
                                    enable: true,
                                    mode: 'push',
                                },
                                resize: true,
                            },
                            modes: {
                                grab: {
                                    distance: 400,
                                    line_linked: {
                                        opacity: 1,
                                    },
                                },
                                bubble: {
                                    distance: 400,
                                    size: 40,
                                    duration: 2,
                                    opacity: 8,
                                    speed: 3,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                                push: {
                                    particles_nb: 4,
                                },
                                remove: {
                                    particles_nb: 2,
                                },
                            },
                        },
                        retina_detect: true,
                    }}
                />
            ) : null}
            <div className={style.wrapper}>
                <h3 className={style.wrapper__title}>{t('myDiplomas')}</h3>
                <h4 className={style.wrapper__subTitle}>{t('clickAndSlide')}</h4>
            </div>

            {props.map(({ x, y, rot, scale }, i) => (
                <animated.span
                    key={i}
                    style={{
                        transform: interpolate(
                            [x, y],
                            (x, y) => `translate3d(${x}px,${y}px,0)`,
                        ),
                    }}
                >
                    <animated.span
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                            backgroundImage: `url(${cards[i]})`,
                        }}
                    />
                </animated.span>
            ))}
        </div>
    );
};

export default Education;
