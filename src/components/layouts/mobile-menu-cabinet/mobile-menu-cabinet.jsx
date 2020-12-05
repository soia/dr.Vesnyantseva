import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Burger from 'react-css-burger';
import CabinetLinks from '../cabinet-links';
import { compose } from '../../../utils';
import { openMenu, closeMenu } from '../../../actions/drawer.actions';
import style from './mobile-menu.module.scss';

class MobileMenuCabinet extends Component {
    static defaultProps = {
        closeDrawerMenu: () => {},
        openDrawerMenu: () => {},
        location: {},
        menu: false,
    };

    static propTypes = {
        closeDrawerMenu: PropTypes.func,
        openDrawerMenu: PropTypes.func,
        location: PropTypes.object,
        menu: PropTypes.bool,
    };

    componentDidUpdate(prevProps) {
        const { closeDrawerMenu, location } = this.props;
        if (location !== prevProps.location) {
            closeDrawerMenu();
        }
    }

    componentWillUnmount() {
        const { closeDrawerMenu } = this.props;
        closeDrawerMenu();
    }

    toggleBurger = () => {
        const { menu, closeDrawerMenu, openDrawerMenu } = this.props;
        if (menu) {
            return closeDrawerMenu();
        }

        openDrawerMenu();
    };

    render() {
        const { menu } = this.props;

        const drawerStyle = menu ? style.drawer__opened : style.drawer__closed;

        if (menu) {
            document.documentElement.style.overflowY = 'hidden';
        } else {
            document.documentElement.style.overflowY = 'inherit';
        }

        return (
            <Fragment>
                <div className={style.burgerMenu}>
                    <Burger
                        onClick={this.toggleBurger}
                        active={menu}
                        burger="spin"
                        color="white"
                        marginTop="0"
                        scale={0.65}
                    />
                </div>
                <div className={drawerStyle}>
                    <CabinetLinks
                        containerStyle={style.burgerMenu__linksWrapper}
                        linkStyle={style.burgerMenu__link}
                        onClick={this.toggleBurger}
                    />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {
        mobileSublinks: { data: mobileSublinks },
        drawer: { menu },
    } = state;

    return {
        mobileSublinks,
        menu,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        openDrawerMenu: () => openMenu(),
        closeDrawerMenu: () => closeMenu(),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
)(MobileMenuCabinet);
