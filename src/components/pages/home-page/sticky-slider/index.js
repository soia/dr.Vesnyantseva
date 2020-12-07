/* eslint-disable */
import React, { useCallback, useEffect, useRef } from 'react';
import { useSpring, animated as a, interpolate } from 'react-spring';
import useWindowScroll from '@react-hook/window-scroll';
import useScrollWidth from './useScrollWidth';
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
            return `translate3d(${elHeight -500}px, 0, 0)`;
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
                    src="https://fenixsmile.com.ua/wp-content/uploads/parodontologiya.jpg"
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src="https://lh3.googleusercontent.com/proxy/gnp4ibSwaqaz6LLXQZP6hqj4h9sHD3Z9gHH7NkmQ08fzeiTQhGdUP3jyfE9YOdUjNx9Jj1eA0429r8_nL86Gy9Pe24DD23ZNI40tZsWq"
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src="https://fenixsmile.com.ua/wp-content/uploads/parodontologiya.jpg"
                    alt="slide"
                    className="img"
                />
            </div>
            <div className="box">
                <img
                    src="https://fenixsmile.com.ua/wp-content/uploads/parodontologiya.jpg"
                    alt="slide"
                    className="img"
                />
            </div>
        </ScrollCarousel>
    </div>
);

export default StickySlider;
