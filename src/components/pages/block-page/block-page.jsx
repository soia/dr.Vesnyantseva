/* eslint-disable camelcase */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tooltip } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../../spinner/spinner';
import truncate from '../../../helpers/truncate-string';
import toFixedBigValue from '../../../helpers/big-number';
import { compose } from '../../../utils';
import withGetService from '../../hoc/with-get-service';
import Pagination from '../../layouts/paginations';
import { transactionPath, addressPath, blockPath } from '../../../constants';
import searchBlockByIndexAction from '../../../actions/get-search-block-by-index.actions';
import getTransactionsByBlockAction from '../../../actions/get-transactions-by-block.actions';
import getLatestSingleBlockAction from '../../../actions/get-latest-single-block.actions';
import Code from './raw-block';
import notFoundIcon from '../../assets/images/icons/search-not-found.svg';
import difficultyIcon from '../../assets/images/icons/difficulty-black-icon.svg';
import pieIcon from '../../assets/images/icons/pie-icon.svg';
import rocketIcon from '../../assets/images/icons/rocket-icon.svg';
import settingsIcon from '../../assets/images/icons/settings-icon.svg';
import ArrowLeftIcon from './images/arrow-left';
import ArrowRightIcon from './images/arrow-right';
import mobileWidth from '../../../helpers/mobile-width';
import style from './block-page.module.scss';

class BlockPage extends Component {
    SWITCH_BLOCK_TYPE = {
        PREV: 'PREV',
        NEXT: 'NEXT',
    };

    static defaultProps = {
        t: () => {},
        getBlockByIndex: () => {},
        getTransactionsByBlock: () => {},
        getLatestSingleBlock: () => {},
        match: {},
        searchBlockByIndex: {},
        transactionsByBlock: {},
        latestSingleBlock: {},
        history: {},
        loading: false,
        success: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getBlockByIndex: PropTypes.func,
        getTransactionsByBlock: PropTypes.func,
        getLatestSingleBlock: PropTypes.func,
        match: PropTypes.object,
        searchBlockByIndex: PropTypes.object,
        transactionsByBlock: PropTypes.object,
        latestSingleBlock: PropTypes.object,
        history: PropTypes.object,
        loading: PropTypes.bool,
        success: PropTypes.bool,
    };

    state = {
        currentPageNumber: '',
        numItemsPerPage: '',
        data: [],
        totalCount: '',
    };

    componentDidMount() {
        const { getLatestSingleBlock } = this.props;
        this.loadData();
        this.loadTransactions(10, 1);
        getLatestSingleBlock();
    }

    componentDidUpdate(prevProps) {
        const {
            match: {
                params: { id },
            },
            success,
            transactionsByBlock: {
                currentPageNumber,
                numItemsPerPage,
                items,
                totalCount,
            },
            getLatestSingleBlock,
        } = this.props;

        if (id !== prevProps.match.params.id) {
            this.loadData();
            getLatestSingleBlock();
        }

        if (success && success !== prevProps.success) {
            this.setState({
                currentPageNumber,
                numItemsPerPage,
                data: items,
                totalCount,
            });
        }
    }

    loadData = () => {
        const {
            getBlockByIndex,
            match: {
                params: { id },
            },
        } = this.props;
        getBlockByIndex(id);
    };

    loadTransactions = (itemsPerPage, numberPage) => {
        const {
            getTransactionsByBlock,
            match: {
                params: { id },
            },
        } = this.props;
        getTransactionsByBlock(itemsPerPage, numberPage, id);
    };

    changePagination = number => {
        const { numItemsPerPage } = this.state;
        this.loadTransactions(numItemsPerPage, number);
    };

    records = records => {
        this.loadTransactions(records, 1);
    };

    switchBlock = (block, type) => {
        const {
            latestSingleBlock: { height },
            history,
        } = this.props;
        if (type === this.SWITCH_BLOCK_TYPE.PREV) {
            if (+block > 1) {
                history.push(`${blockPath}/${+block - 1}`);
            }
        }

        if (type === this.SWITCH_BLOCK_TYPE.NEXT) {
            if (+block < height) {
                history.push(`${blockPath}/${+block + 1}`);
            }
        }
    };

    render() {
        const {
            t,
            searchBlockByIndex,
            searchBlockByIndex: {
                hash: blockHash,
                output_total,
                difficulty,
                tx = [],
                time,
                size,
            },
            loading,
            match: {
                params: { id: block },
            },
            latestSingleBlock: { height },
        } = this.props;

        const {
            currentPageNumber, numItemsPerPage, data, totalCount,
        } = this.state;

        const { TabPane } = Tabs;

        if (loading) {
            return <Spinner />;
        }

        if (!Object.keys(searchBlockByIndex).length) {
            return (
                <div className={style.notFoundIcon}>
                    <img src={notFoundIcon} alt="notFoundIcon" />
                    <p className={style.notFoundIcon__title}>{t('nothingFound')}</p>
                </div>
            );
        }

        const arrowLeftStyle = block <= 1 ? style.arrowDisabled : '';
        const arrowRightStyle = block === height ? style.arrowDisabled : '';

        const infoData = [
            {
                icon: rocketIcon,
                label: t('valueOut'),
                value: `${toFixedBigValue(output_total, 5)} BTCU`,
            },
            {
                icon: difficultyIcon,
                label: t('difficulty'),
                value: `${toFixedBigValue(difficulty, 5)}`,
            },
            {
                icon: pieIcon,
                label: t('outstanding'),
                value: '-67,421,881.343 BTCU',
            },
            {
                icon: settingsIcon,
                label: t('created'),
                value: (
                    <Moment format="DD.MM.YYYY, hh:mm A" unix>
                        {time / 1000}
                    </Moment>
                ),
            },
        ];

        return (
            <div className={style.block} id="block-page">
                <h1 className={style.block__title}>
                    BTCU {t('blockHeight')} #{block}
                </h1>
                <div className={style.block__top}>
                    <div className={style.block__topWrapper}>
                        <div
                            className={style.block__top_arrowLeft}
                            onClick={() => this.switchBlock(block, this.SWITCH_BLOCK_TYPE.PREV)
                            }
                        >
                            <ArrowLeftIcon className={arrowLeftStyle} />
                        </div>
                        <p className={style.block__top_address}>
                            {mobileWidth() ? truncate(blockHash, 26) : blockHash}
                        </p>
                        <div
                            className={style.block__top_arrowRight}
                            onClick={() => this.switchBlock(block, this.SWITCH_BLOCK_TYPE.NEXT)
                            }
                        >
                            <ArrowRightIcon className={arrowRightStyle} />
                        </div>
                    </div>
                    <div className={style.block__top_wrapper}>
                        <p className={style.block__top_date}>
                            <Moment format="DD.MM.YYYY, hh:mm A" unix>
                                {time / 1000}
                            </Moment>{' '}
                            {t('extractedProofOfStake')}
                        </p>
                        <p className={style.block__top_transactions}>
                            {t('transactions')}: {tx.length} <span>{size / 1000} kB</span>
                        </p>
                    </div>
                </div>
                <div className={style.block__bottom}>
                    {infoData.map(item => {
                        const { icon, label, value } = item;

                        return (
                            <div key={label} className={style.block__bottom_item}>
                                <img
                                    className={style.block__bottom_icon}
                                    src={icon}
                                    alt="infoIcon"
                                />
                                <p className={style.block__bottom_label}>{label}</p>
                                <p className={style.block__bottom_value}>{value}</p>
                            </div>
                        );
                    })}
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('transaction')} key="1">
                        <div className={style.transaction}>
                            {data.map(item => {
                                const {
                                    hash,
                                    output_total: valueOut,
                                    from,
                                    to,
                                    fee,
                                } = item;

                                return (
                                    <div key={hash} className={style.transaction__row}>
                                        <div className={style.transaction__item_hash}>
                                            <p className={style.transaction__item_label}>
                                                {t('hash')}
                                            </p>
                                            <Tooltip placement="topLeft" title={hash}>
                                                <Link to={`${transactionPath}/${hash}`}>
                                                    {mobileWidth()
                                                        ? truncate(hash, 17)
                                                        : truncate(hash, 18)}
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div className={style.transaction__item_valueOut}>
                                            <p className={style.transaction__item_label}>
                                                {t('valueOut')}
                                            </p>
                                            <span>{toFixedBigValue(valueOut, 5)}</span>
                                        </div>
                                        <div
                                            className={style.transaction__item_fromAmount}
                                        >
                                            <p className={style.transaction__item_label}>
                                                {t('from')}
                                            </p>
                                            {from.length ? (
                                                <Link to={`${addressPath}/${from[0]}`}>
                                                    {mobileWidth()
                                                        ? truncate(from[0], 15)
                                                        : from[0]}
                                                </Link>
                                            ) : (
                                                <span>{t('generationFees')}</span>
                                            )}
                                        </div>
                                        <div className={style.transaction__item_toAmount}>
                                            <p className={style.transaction__item_label}>
                                                {t('to')}
                                            </p>
                                            {to.length ? (
                                                <Link to={`${addressPath}/${to[0]}`}>
                                                    {mobileWidth()
                                                        ? truncate(to[0], 15)
                                                        : to[0]}
                                                </Link>
                                            ) : (
                                                <span>{t('includedfollowingTx')}</span>
                                            )}
                                        </div>
                                        <div className={style.transaction__item_fee}>
                                            <p className={style.transaction__item_label}>
                                                {t('fee')}
                                            </p>
                                            <span>{toFixedBigValue(fee, 5)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <Pagination
                            numItemsPerPage={numItemsPerPage}
                            totalCount={totalCount}
                            currentPageNumber={currentPageNumber}
                            recordsOnClick={this.records}
                            paginationOnChange={this.changePagination}
                        />
                    </TabPane>
                    <TabPane tab={t('rawBlock')} key="2">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>
                                <Code code={searchBlockByIndex} />
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        searchBlockByIndex: { data: searchBlockByIndex, loading },
        transactionsByBlock: { data: transactionsByBlock, success },
        latestSingleBlock: { data: latestSingleBlock },
    } = state;

    return {
        searchBlockByIndex,
        loading,
        transactionsByBlock,
        success,
        latestSingleBlock,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getBlockByIndex: searchBlockByIndexAction(getService),
        getTransactionsByBlock: getTransactionsByBlockAction(getService),
        getLatestSingleBlock: getLatestSingleBlockAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(BlockPage);
