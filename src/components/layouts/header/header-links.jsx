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
            },
            {
                id: '2',
                name: t('education'),
                path: '/',
            },
            {
                id: '3',
                name: t('blog'),
            },
        ];

        return (
            <ul className={classNameList}>
                {links.map(item => {
                    const { name, path, id } = item;

                    return (
                        <li key={id} className={classNameItem}>
                            <AnchorLink href={path}>{name}</AnchorLink>
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
