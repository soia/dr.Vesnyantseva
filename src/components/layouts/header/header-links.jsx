import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { mobileSublinksActions } from '../../../actions/mobile-sublinks.actions';
import mobileWidth from '../../../helpers/mobile-width';
import { compose } from '../../../utils';

class ListOfLinks extends Component {
    static defaultProps = {
        t: () => {},
        setSubLinks: () => {},
        classNameList: '',
        classNameItem: '',
    };

    static propTypes = {
        t: PropTypes.func,
        setSubLinks: PropTypes.func,
        classNameList: PropTypes.string,
        classNameItem: PropTypes.string,
    };

    selectCategory = id => {
        const { setSubLinks } = this.props;
        if (mobileWidth()) {
            setSubLinks(id);
        }
    };

    render() {
        const { t, classNameList, classNameItem } = this.props;

        const links = [
            {
                id: '1',
                name: t('aboutMe'),
                path: '#aboutMe',
                icon: null,
            },
            {
                id: '2',
                name: t('education'),
                path: '#education',
                icon: null,
            },
            {
                id: '3',
                name: t('blog'),
                path: '/',
                icon: null,
            },
            {
                id: '4',
                name: t('gallery'),
                path: '/',
                icon: null,
            },
            {
                id: '5',
                name: t('boxes'),
                path: '/',
                icon: null,
            },
            {
                id: '6',
                name: t('contacts'),
                path: '/',
                icon: null,
            },
        ];

        return (
            <ul className={classNameList}>
                {links.map(item => {
                    const {
                        name, path, id, icon,
                    } = item;

                    return (
                        <li key={id} className={classNameItem}>
                            <AnchorLink href={path}>{name}</AnchorLink>
                            {icon ? <img src={icon} alt="icon" /> : null}
                        </li>
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => {
    const {
        mobileSublinks: { data: mobileSublinks },
    } = state;

    return {
        mobileSublinks,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setSubLinks: data => mobileSublinksActions.set(data),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    connect(mapStateToProps, mapDispatchToProps),
)(ListOfLinks);
