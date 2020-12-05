/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import getMainPageInfoAction from '../../../../actions/get-main-page-info.actions';
import withGetService from '../../../hoc/with-get-service';
import truncate from '../../../../helpers/truncate-string';
import { compose } from '../../../../utils';
import { blockPath } from '../../../../constants';
import Spinner from '../../../spinner';
import mobileWidth from '../../../../helpers/mobile-width';
import style from './block-screen.module.scss';

class BlockScreen extends Component {
    static defaultProps = {
        t: () => {},
        getMainPageInfo: () => {},
        mainPageInfo: {},
        latestBlocks: [],
    };

    static propTypes = {
        t: PropTypes.func,
        getMainPageInfo: PropTypes.func,
        mainPageInfo: PropTypes.object,
        latestBlocks: PropTypes.instanceOf(Array),
    };

    state = {};

    componentDidMount() {
        const { getMainPageInfo } = this.props;
        getMainPageInfo();
    }

    render() {
        const {
            t,
            latestBlocks,
            mainPageInfo: {
                difficulty,
                masternodeCount,
                nextSuperBlock,
                totalMoneySupply,
                totalZerocoinSupply,
                zerocoinSupply,
            },
            mainPageInfo,
        } = this.props;

        const totalMoneySupplyValue = totalMoneySupply
            ? (+totalMoneySupply).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            : '0';

        const latestBlock = latestBlocks[0];
        const { height, hash, time } = latestBlock || {};

        const blockIndexData = [
            {
                title: t('lastIndexedBlock'),
                value: height,
                link: `${blockPath}/${height}`,
            },
            {
                title: t('latestBlockHash'),
                value: (
                    <Tooltip placement="top" title={hash}>
                        {`${truncate(hash, mobileWidth() ? 18 : 39)}`}
                    </Tooltip>
                ),
                link: `${blockPath}/${height}`,
            },
            {
                title: t('lastBlockUpdate'),
                value: moment.unix(time / 1000).format('ddd, Do MMM YYYY, h:mm:ss a'),
                link: null,
            },
            {
                title: t('difficulty'),
                value: difficulty,
                link: null,
            },
            {
                title: t('totalMoneySupply'),
                value: totalMoneySupplyValue,
                link: null,
            },
            {
                title: t('zerocoinSupply'),
                value: totalZerocoinSupply,
                link: null,
            },
            {
                title: t('masternodeCount'),
                value: masternodeCount,
                link: null,
            },
            {
                title: t('nextSuperblock'),
                value: nextSuperBlock,
                link: null,
            },
        ];

        const BlockIndexLayout = () => (
            <Fragment>
                {blockIndexData.map(item => {
                    const { title, value, link } = item;

                    return (
                        <div key={title} className={style.container__item}>
                            <Tooltip placement="top" title={title}>
                                <p className={style.container__item_label}>{title}</p>
                            </Tooltip>
                            {link ? (
                                <Link to={link} className={style.container__item_link}>
                                    {value}
                                </Link>
                            ) : (
                                <p className={style.container__item_content}>{value}</p>
                            )}
                        </div>
                    );
                })}
            </Fragment>
        );

        const ZerocoinSupplyLayout = () => (
            <Fragment>
                {zerocoinSupply.map(item => {
                    const { denon, qaunity, total } = item;

                    return (
                        <div key={denon} className={style.container__itemZerocoin}>
                            <Tooltip placement="top" title={`${denon}-denon`}>
                                <p
                                    className={
                                        style.container__itemZerocoin_labelZerocoin
                                    }
                                >
                                    {denon}-denon
                                </p>
                            </Tooltip>
                            <p className={style.container__itemZerocoin_contentZerocoin}>
                                {qaunity}
                            </p>
                            <p className={style.container__itemZerocoin_priceZerocoin}>
                                {total} BTCU
                            </p>
                        </div>
                    );
                })}
            </Fragment>
        );

        return (
            <div className={style.container}>
                <div className={style.container__column}>
                    <div className={style.container__header}>
                        <h3 className={style.container__column_title}>
                            {t('blockIndex')}
                        </h3>
                    </div>
                    <div className={style.container__wrapper}>
                        {!Object.keys(mainPageInfo).length ? (
                            <Spinner />
                        ) : (
                            <BlockIndexLayout />
                        )}
                    </div>
                </div>
                <div className={style.container__column}>
                    <div className={style.container__header}>
                        <h3 className={style.container__column_title}>
                            {t('zerocoinSupply')}
                        </h3>
                    </div>
                    <div className={style.container__wrapper}>
                        {!Object.keys(mainPageInfo).length ? (
                            <Spinner />
                        ) : (
                            <ZerocoinSupplyLayout />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        mainPageInfo: { data: mainPageInfo },
        latestBlocks: { data: latestBlocks },
    } = state;

    return {
        mainPageInfo,
        latestBlocks,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getMainPageInfo: getMainPageInfoAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(BlockScreen);
