import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from '../../../../../utils';
import Avatar from '../../../../UI/avatar';
import CabinetLinks from '../../../../layouts/cabinet-links';
import style from './aside.module.scss';
import './aside.scss';

const Aside = ({ user: { avatar, login } }) => {
    const logoStyle = avatar ? style.aside__top_logo : style.aside__top_noLogo;

    return (
        <aside id="aside" className={style.aside}>
            <div className={style.aside__top}>
                <Avatar className={logoStyle} src={avatar} userName={login} />
                <p className={style.aside__top_name}>{login}</p>
            </div>
            <div className={style.aside__bottom}>
                <CabinetLinks
                    containerStyle={style.aside__linksWrapper}
                    linkStyle={style.aside__link}
                />
            </div>
        </aside>
    );
};

const mapStateToProps = state => {
    const {
        authentication: { user },
    } = state;

    return {
        user,
    };
};

Aside.defaultProps = {
    user: {},
};

Aside.propTypes = {
    user: PropTypes.object,
};

export default compose(connect(mapStateToProps))(Aside);
