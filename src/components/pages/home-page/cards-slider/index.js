/* eslint-disable */
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './styles.scss';
import './style.css';

const cards = [
    'https://fainaidea.com/wp-content/uploads/2019/02/diplom.jpg',
    'https://diplomukr.kiev.ua/wp-content/uploads/2020/02/attestat-scaled.jpg',
    'https://dabi.gov.ua/wp-content/uploads/2018/11/dyp-2.jpg',
    'https://martex.pro/wp-content/uploads/2018/12/nagradnye-diplomy-na-metalle.-diplom-na-derevjannoj-podlozhke-pegas-touristik-1.jpg',
    'https://vesti.ua/wp-content/uploads/2015/07/106385.jpg',
    'https://fainaidea.com/wp-content/uploads/2019/02/diplom.jpg',
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

const cardSlider = () => {
    const [gone] = useState(() => new Set());
    const [props, set] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }));

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
        <div id="cardSlider">
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
                    rel="stylesheet"
                    type="text/css"
                />
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
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

export default cardSlider;
