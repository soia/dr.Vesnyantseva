import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/logos/white-logo.svg';
import companyIcon from '../../assets/images/icons/company-icon.svg';
import locationIcon from '../../assets/images/icons/location-icon.svg';
import contactIcon from '../../assets/images/icons/contact-icon.svg';
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
                        <li className={style.list__title}>
                            <img src={companyIcon} alt="companyIcon" />
                            {t('company')}
                        </li>
                        <li className={style.list__link}>
                            <Link to="/">{t('aboutUs')}</Link>
                        </li>
                        <li className={style.list__link}>
                            <Link to="/">{t('advantages')}</Link>
                        </li>
                        <li className={style.list__link}>
                            <Link to="/">{t('airdrop')}</Link>
                        </li>
                        <li className={style.list__link}>
                            <Link to="/">{t('partners')}</Link>
                        </li>
                    </ul>
                    <ul className={style.list}>
                        <li className={style.list__title}>
                            <img src={locationIcon} alt="location" />
                            {t('location')}
                        </li>
                        <li className={style.list__text}>{t('hongKongChina')}</li>
                        <li className={style.list__text}>7/F MW Tower 111</li>
                        <li className={style.list__text}>Bonham Strand</li>
                        <li className={style.list__text}>Sheung Wan</li>
                    </ul>
                    <ul className={style.list}>
                        <li className={style.list__title}>
                            <img src={contactIcon} alt="contact" />
                            {t('contact')}
                        </li>
                        <li className={style.list__link}>
                            <a href="mailto:support@btcu.io">support@btcu.io</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={style.footer__bottom}>
                <p>Prof-IT Blockchain Limited</p>
                <p className={style.footer__bottom__right}>
                    {t('allRightsReserved')}, Bitcoin Ultimatum
                </p>
            </div>
        </footer>
    );
};

export default Footer;
