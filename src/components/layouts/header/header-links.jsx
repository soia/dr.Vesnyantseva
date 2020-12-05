import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import ArrowRight from '../../assets/images/icons/arrow-right';
import { mobileSublinksActions } from '../../../actions/mobile-sublinks.actions';
import mobileWidth from '../../../helpers/mobile-width';
import { compose } from '../../../utils';

class ListOfLinks extends Component {
    static defaultProps = {
        t: () => {},
        setSubLinks: () => {},
        classNameList: '',
        classNameItem: '',
        classNameSubLinks: '',
        mobileSublinks: '',
    };

    static propTypes = {
        t: PropTypes.func,
        setSubLinks: PropTypes.func,
        classNameList: PropTypes.string,
        classNameItem: PropTypes.string,
        classNameSubLinks: PropTypes.string,
        mobileSublinks: PropTypes.string,
    };

    selectCategory = id => {
        const { setSubLinks } = this.props;
        if (mobileWidth()) {
            setSubLinks(id);
        }
    };

    render() {
        const {
            t,
            classNameList,
            classNameItem,
            classNameSubLinks,
            mobileSublinks,
        } = this.props;

        const links = [
            {
                id: '1',
                name: t('aboutMe'),
                path: '/',
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

        const activeSublinks = links.find(item => item.id === mobileSublinks);

        if (activeSublinks) {
            return (
                <ul className={classNameSubLinks}>
                    {activeSublinks.subLinks.map(list => {
                        const { title, subPath } = list;

                        return (
                            <li key={title}>
                                <Link to={subPath}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (
            <ul className={classNameList}>
                {links.map(item => {
                    const {
                        name, path, id, subLinks,
                    } = item;

                    return (
                        <li key={id} className={classNameItem}>
                            {!subLinks ? (
                                <Link to={path}>{name}</Link>
                            ) : (
                                <div onClick={() => this.selectCategory(id)}>
                                    {name} <ArrowRight />
                                </div>
                            )}
                            {!mobileWidth() && subLinks ? (
                                <div className={classNameSubLinks}>
                                    {subLinks.map(list => {
                                        const { title, subPath } = list;

                                        return (
                                            <Fragment key={title}>
                                                <Link to={subPath}>{title}</Link>
                                            </Fragment>
                                        );
                                    })}
                                </div>
                            ) : null}
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
