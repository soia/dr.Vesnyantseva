import React, { useRef } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import Sequence from './Sequence';

const ImagesOnScroll = () => {
    const ref = useRef();
    return (
        <div>
            <Controller>
                <Scene duration="200%" triggerHook="onLeave" pin>
                    {progress => (
                        <div style={{ height: '100vh', position: 'relative' }}>
                            <Sequence ref={ref} progress={progress} />
                        </div>
                    )}
                </Scene>
            </Controller>
        </div>
    );
};


export default ImagesOnScroll;
