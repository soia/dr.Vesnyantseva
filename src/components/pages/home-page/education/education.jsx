import React from 'react';
import portret from '../../../assets/images/portrets/portret.png';
import signature from '../../../assets/images/portrets/signature.png';
import style from './education.module.scss';

const Education = () => (
    <div className={style.education} id="aboutMe">
        <div className={style.letter}>
            <img className={style.letter__portret} src={portret} alt="portret" />
            <h3 className={style.letter__title}>Hello!</h3>
            <p className={style.letter__text}>
                I'm a dentist who fears going to the dentist.
            </p>
            <p className={style.letter__text}>
                My fear gave birth to a dream. What if I could create a dental practice
                that I would love to visit, that patients would love to visit?
            </p>
            <p className={style.letter__text}>
                Eventually my dream grew big enough to inspire courage and I put pen to
                paper. Two months and 45 pages later, Smile & Co. was born.
            </p>
            <p className={style.letter__text}>Dentistry, differently.</p>
            <p className={style.letter__text}>
                No white coats. No judgments. No pressure. A place where we take dentistry
                seriously, but not ourselves. A place to laugh, have fun, and be family.
            </p>
            <div className={style.letter__sine}>
                <img src={signature} alt="signature" />
            </div>
        </div>
    </div>
);

export default Education;
