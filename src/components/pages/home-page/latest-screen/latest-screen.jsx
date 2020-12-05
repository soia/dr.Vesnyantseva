/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import truncate from '../../../../helpers/truncate-string';
import withGetService from '../../../hoc/with-get-service';
import ArrowRightIcon from '../../../assets/images/icons/arrow-right';
import { compose } from '../../../../utils';
import mobileWidth from '../../../../helpers/mobile-width';
import {
    blockPath,
    transactionPath,
    addressPath,
    allTransactionsPath,
    allBlocksPath,
} from '../../../../constants';
import toFixedBigValue from '../../../../helpers/big-number';
import Spinner from '../../../spinner';
import getLatestTransactionsAction from '../../../../actions/get-latest-transactions.actions';
import getLatestBlocksAction from '../../../../actions/get-latest-blocks.actions';
import logo from '../../../assets/images/icons/btcu-blue-icon.svg';
import btcuTicker from '../../../assets/images/icons/btcu-ticker-icon.svg';
import style from './latest-screen.module.scss';

class LatestScreen extends Component {
    static defaultProps = {
        t: () => {},
        getLatestTransactions: () => {},
        getLatestBlocks: () => {},
        latestBlocks: [],
        latestTransactions: [],
    };

    static propTypes = {
        t: PropTypes.func,
        getLatestTransactions: PropTypes.func,
        getLatestBlocks: PropTypes.func,
        latestBlocks: PropTypes.instanceOf(Array),
        latestTransactions: PropTypes.instanceOf(Array),
    };

    componentDidMount() {
        const { getLatestTransactions, getLatestBlocks } = this.props;
        getLatestTransactions();
        getLatestBlocks();
    }

    render() {
        const { t, latestBlocks, latestTransactions } = this.props;

        return (
            <div className={style.latest}>
                <div className={style.latest__column}>
                    <div className={style.latest__header}>
                        <h3 className={style.latest__column_title}>
                            {t('latestsBlocks')}
                        </h3>
                        <Link to={allBlocksPath} className={style.latest__header_button}>
                            <ArrowRightIcon className={style.latest__header_buttonIcon} />
                            {t('viewAll')}
                        </Link>
                    </div>
                    {!latestBlocks.length ? (
                        <div className={style.spinner}>
                            <Spinner />
                        </div>
                    ) : null}
                    {latestBlocks.map(item => {
                        const {
                            height, time, hash, block_reward,
                        } = item;

                        const getTime = new Date(+time);
                        const timeFromNow = moment(getTime).fromNow();

                        return (
                            <div key={height} className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_info,
                                    )}
                                >
                                    <Link
                                        to={`${blockPath}/${height}`}
                                        className={classNames(
                                            style.card__item_red,
                                            style.card__item_tx,
                                        )}
                                    >
                                        {height}
                                    </Link>
                                    <p
                                        className={classNames(
                                            style.card__item_gray,
                                            style.card__item_blockTime,
                                        )}
                                    >
                                        <Tooltip placement="top" title={timeFromNow}>
                                            {timeFromNow}
                                        </Tooltip>
                                    </p>
                                </div>
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_addresses,
                                    )}
                                >
                                    <div className={style.card__item_blockRow}>
                                        <p className={style.card__item_label}>
                                            {t('hash')}
                                        </p>
                                        <Link
                                            to={`${blockPath}/${height}`}
                                            className={classNames(
                                                style.card__item_red,
                                                style.card__item_address,
                                            )}
                                        >
                                            <Tooltip placement="top" title={hash}>
                                                {`${truncate(
                                                    hash,
                                                    mobileWidth() ? 31 : 30,
                                                )}`}
                                            </Tooltip>
                                        </Link>
                                    </div>
                                </div>
                                <Tooltip placement="top" title={t('blockReward')}>
                                    <div className={style.card__reward}>
                                        <img src={btcuTicker} alt="ticker" />{' '}
                                        {toFixedBigValue(block_reward, 5)} BTCU
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
                <div className={style.latest__column}>
                    <div className={style.latest__header}>
                        <h3 className={style.latest__column_title}>
                            {t('latestsTransactions')}
                        </h3>
                        <Link
                            to={allTransactionsPath}
                            className={style.latest__header_button}
                        >
                            <ArrowRightIcon className={style.latest__header_buttonIcon} />
                            {t('viewAll')}
                        </Link>
                    </div>
                    {!latestTransactions.length ? (
                        <div className={style.spinner}>
                            <Spinner />
                        </div>
                    ) : null}
                    {latestTransactions.map(item => {
                        const {
                            hash, time, output_total, from, to,
                        } = item;

                        const getTime = new Date(+time);
                        const timeFromNow = moment(getTime).fromNow();

                        return (
                            <div key={hash} className={style.card}>
                                <img className={style.card__logo} src={logo} alt="logo" />
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_info,
                                    )}
                                >
                                    <Link
                                        to={`${transactionPath}/${hash}`}
                                        className={classNames(
                                            style.card__item_red,
                                            style.card__item_tx,
                                        )}
                                    >
                                        <Tooltip placement="top" title={hash}>
                                            {`${truncate(hash, mobileWidth() ? 15 : 9)}`}
                                        </Tooltip>
                                    </Link>
                                    <p className={style.card__item_gray}>{timeFromNow}</p>
                                </div>
                                <div
                                    className={classNames(
                                        style.card__item,
                                        style.card__item_addresses,
                                    )}
                                >
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('from')}
                                        </p>
                                        {from.length ? (
                                            <Link
                                                to={`${addressPath}/${from[0]}`}
                                                className={classNames(
                                                    style.card__item_red,
                                                    style.card__item_address,
                                                )}
                                            >
                                                <Tooltip placement="top" title={from[0]}>
                                                    {`${truncate(
                                                        from[0],
                                                        mobileWidth() ? 31 : 23,
                                                    )}`}
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <p className={style.card__item_noFromTo}>
                                                {t('generationFees')}
                                            </p>
                                        )}
                                    </div>
                                    <div className={style.card__item_row}>
                                        <p className={style.card__item_label}>
                                            {t('to')}
                                        </p>
                                        {to.length ? (
                                            <Link
                                                to={`${addressPath}/${to[0]}`}
                                                className={classNames(
                                                    style.card__item_red,
                                                    style.card__item_address,
                                                )}
                                            >
                                                <Tooltip placement="top" title={to[0]}>
                                                    {`${truncate(
                                                        to[0],
                                                        mobileWidth() ? 31 : 23,
                                                    )}`}
                                                </Tooltip>
                                            </Link>
                                        ) : (
                                            <p className={style.card__item_noFromTo}>
                                                {t('includedfollowingTx')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Tooltip placement="top" title={t('valueOut')}>
                                    <div className={style.card__reward}>
                                        <img src={btcuTicker} alt="ticker" />{' '}
                                        {toFixedBigValue(output_total, 5)} BTCU
                                    </div>
                                </Tooltip>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        latestBlocks: { data: latestBlocks },
        latestTransactions: { data: latestTransactions },
    } = state;

    return {
        latestBlocks,
        latestTransactions,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getLatestTransactions: getLatestTransactionsAction(getService),
        getLatestBlocks: getLatestBlocksAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(LatestScreen);
