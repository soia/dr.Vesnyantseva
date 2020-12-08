/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring, animated as a, interpolate } from 'react-spring';
import useWindowScroll from '@react-hook/window-scroll';
import Particles from 'react-particles-js';
import useScrollWidth from './useScrollWidth';
import slide1 from './images/slide-1.JPG';
import slide2 from './images/slide-2.JPG';
import slide3 from './images/slide-3.JPG';
import slide4 from './images/slide-4.JPG';
import './styles.scss';

function ScrollCarousel({ children }) {
    const refHeight = useRef(null);
    const refTransform = useRef(null);

    const { scrollWidth } = useScrollWidth(refTransform);
    const scrollY = useWindowScroll(45);
    const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));

    useEffect(() => {
        set({ st: scrollY });
    }, [scrollY, set]);

    const onMouseMove = useCallback(
        ({ clientX: x, clientY: y }) =>
            set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
        [],
    );

    const [active, setActive] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 500);
    }, []);
    const top = refHeight.current ? refHeight.current.offsetTop : 0;
    const width = refHeight.current ? refHeight.current.offsetWidth : 0;
    const elHeight = scrollWidth - (window.innerWidth - window.innerHeight) + width * 0.5;
    const interpTransform = interpolate([st, xy], (o, xy) => {
        const mouseMoveDepth = 40;
        const x = width - (top - o) - width;
        if (x < -window.innerHeight - width * 0.5) {
            return `translate3d(${window.innerHeight}px, 0, 0)`;
        }

        if (Math.abs(x) > elHeight) {
            return `translate3d(${elHeight - 500}px, 0, 0)`;
        }

        return `translate3d(${-x + -xy[0] / mouseMoveDepth}px, ${-xy[1] /
            mouseMoveDepth}px, 0)`;
    });

    return (
        <div
            onMouseMove={onMouseMove}
            className="scroll-carousel"
            ref={refHeight}
            style={{ height: elHeight - 500 }}
        >
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
            <div className="sticky-box">
                <a.div
                    style={{ transform: interpTransform }}
                    className="transform-box"
                    ref={refTransform}
                >
                    {children}
                </a.div>
            </div>
        </div>
    );
}

const StickySlider = () => (
    <div className="container">
        <ScrollCarousel>
            <div className="box">
                <img
                    src={slide1}
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src={slide2}
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src={slide3}
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src={slide4}
                    alt="slide"
                    className="img"
                />
            </div>
        </ScrollCarousel>
    </div>
);

export default StickySlider;
