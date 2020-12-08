import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from '../../mobile-menu';
import ListOfLinks from '../header-links';
import SelectLangeage from '../../../language';
import logo from '../../../assets/images/logos/white-logo.svg';
import style from './header.module.scss';

const Header = () => (
    <header className={style.header}>
        <div className={style.header__leftSide}>
            <div className={style.header__logo}>
                <Link to="/">
                    <img className={style.header__logo_img} src={logo} alt="logo" />
                </Link>
            </div>
            <div className={style.header__linksWrapper}>
                <ListOfLinks
                    classNameList={style.header__links}
                    classNameItem={style.header__links_item}
                    classNameSubLinks={style.header__subLinks}
                />
            </div>
        </div>
        <div className={style.header__rightSide}>
            <SelectLangeage />
        </div>
        <MobileMenu />
    </header>
);

export default Header;
