import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import instaIcon from '../../assets/images/icons/instagram.svg';
import facebookIcon from '../../assets/images/icons/facebook.svg';
import emailIcon from '../../assets/images/icons/email.svg';
import logo from '../../assets/images/logos/white-logo.svg';
import ListOfLinks from '../header/header-links';
import style from './footer.module.scss';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer className={style.footer} id="footer">
            <div className={style.footer__top}>
                <Link to="/" className={style.footer__logo}>
                    <img className={style.footer__logo_img} src={logo} alt="logo" />
                </Link>
                <div className={style.linksWrapper}>
                    <ul className={style.list}>
                        <li className={style.list__title}>{t('menu')}</li>
                        <ListOfLinks
                            classNameList={style.list__wrapper}
                            classNameItem={style.list__link}
                        />
                    </ul>
                    <ul className={style.list}>
                        <li className={style.list__title}>{t('location')}</li>
                        <li className={style.list__text}>{t('ukraine')}</li>
                    </ul>
                    <ul className={style.list}>
                        <li className={style.list__title}>{t('contact')}</li>
                        <li className={style.list__link}>
                            <img src={emailIcon} alt="emailIcon" />
                            <a href="mailto:katevesnyantseva@gmail.com">
                        katevesnyantseva@gmail.com
                            </a>
                        </li>
                        <br />
                        <li className={style.list__link}>
                            <a
                                href="https://www.instagram.com/dr.vesnyantseva/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={instaIcon} alt="instaIcon" />
                                Instagram
                            </a>
                        </li>
                        <br />
                        <li className={style.list__link}>
                            <a
                                href="https://www.facebook.com/kate.vesnyantseva/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={facebookIcon} alt="facebookIcon" />
                                Facebook
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.footer__bottom}>
                <p>Made by Nikita Soia</p>
                <p className={style.footer__bottom__right}>
                    &copy; Copyright {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
