/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip } from 'antd';
import Pagination from '../../layouts/paginations';
import Spinner from '../../spinner/spinner';
import truncate from '../../../helpers/truncate-string';
import toFixedBigValue from '../../../helpers/big-number';
import getAllTransactionsAction from '../../../actions/get-all-transactions.actions';
import withGetService from '../../hoc/with-get-service';
import { transactionPath, blockPath, addressPath } from '../../../constants';
import { compose } from '../../../utils';
import mobileWidth from '../../../helpers/mobile-width';
import style from './all-transactions.module.scss';

class AllTransactions extends Component {
    static defaultProps = {
        t: () => {},
        getAllTransactions: () => {},
        allTransactions: {},
        success: false,
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getAllTransactions: PropTypes.func,
        allTransactions: PropTypes.object,
        success: PropTypes.bool,
        loading: PropTypes.bool,
    };

    state = {
        currentPageNumber: '',
        numItemsPerPage: '',
        data: [],
        totalCount: '',
        spinner: true,
    };

    componentDidMount() {
        this.loadData(10, 1);
    }

    componentDidUpdate(prevProps) {
        const {
            success,
            allTransactions: {
                currentPageNumber, numItemsPerPage, items, totalCount,
            },
        } = this.props;

        if (success && success !== prevProps.success) {
            this.setState({
                currentPageNumber,
                numItemsPerPage,
                data: items,
                totalCount,
                spinner: false,
            });
        }
    }

    loadData = (itemsPerPage, numberPage) => {
        const { getAllTransactions } = this.props;
        getAllTransactions(itemsPerPage, numberPage);
    };

    changePagination = number => {
        const { numItemsPerPage } = this.state;
        this.loadData(numItemsPerPage, number);
    };

    records = records => {
        this.loadData(records, 1);
    };

    render() {
        const { t, loading } = this.props;

        const {
            currentPageNumber,
            numItemsPerPage,
            data,
            totalCount,
            spinner,
        } = this.state;

        if (loading && spinner) {
            return <Spinner />;
        }

        return (
            <div className={style.allTransactions}>
                <h1 className={style.allTransactions__title}>{t('allTransactions')}</h1>
                <div className={style.table}>
                    {data.map(item => {
                        const {
                            hash,
                            block_id,
                            time,
                            output_total,
                            fee,
                            from,
                            to,
                        } = item;

                        const getTime = new Date(+time);
                        const timeFromNow = moment(getTime).fromNow();

                        return (
                            <div key={hash} className={style.table__row}>
                                <div className={style.table__column1}>
                                    <p className={style.table__label}>{t('txnHash')}</p>
                                    <Tooltip placement="topLeft" title={hash}>
                                        <Link
                                            to={`${transactionPath}/${hash}`}
                                            className={style.table__link}
                                        >
                                            {`${truncate(hash, mobileWidth() ? 15 : 23)}`}
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div className={style.table__column2}>
                                    <p className={style.table__label}>{t('block')}</p>
                                    <Link
                                        to={`${blockPath}/${block_id}`}
                                        className={style.table__link}
                                    >
                                        {block_id}
                                    </Link>
                                </div>
                                <div className={style.table__column3}>
                                    <p className={style.table__label}>{t('age')}</p>
                                    <p className={style.table__text}>{timeFromNow}</p>
                                </div>
                                <div className={style.table__column4}>
                                    <p className={style.table__label}>{t('from')}</p>
                                    {from && from.length ? (
                                        <Tooltip placement="topLeft" title={from[0]}>
                                            <Link
                                                to={`${addressPath}/${from[0]}`}
                                                className={style.table__link}
                                            >
                                                {mobileWidth()
                                                    ? truncate(from[0], 15)
                                                    : truncate(from[0], 29)}
                                            </Link>
                                        </Tooltip>
                                    ) : (
                                        <span className={style.table__text}>
                                            {t('generationFees')}
                                        </span>
                                    )}
                                </div>
                                <div className={style.table__column5}>
                                    <p className={style.table__label}>{t('to')}</p>
                                    {to && to.length ? (
                                        <Tooltip placement="topLeft" title={to[0]}>
                                            <Link
                                                to={`${addressPath}/${to[0]}`}
                                                className={style.table__link}
                                            >
                                                {mobileWidth()
                                                    ? truncate(to[0], 15)
                                                    : truncate(to[0], 29)}
                                            </Link>
                                        </Tooltip>
                                    ) : (
                                        <span className={style.table__text}>
                                            {t('includedfollowingTx')}
                                        </span>
                                    )}
                                </div>
                                <div className={style.table__column6}>
                                    <p className={style.table__label}>{t('value')}</p>
                                    <p className={style.table__text}>
                                        {toFixedBigValue(output_total, 5)}
                                    </p>
                                </div>
                                <div className={style.table__column7}>
                                    <p className={style.table__label}>[Txn {t('fee')}]</p>
                                    <p className={style.table__text}>
                                        {fee === null ? '-' : toFixedBigValue(fee, 5)}
                                    </p>
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        allTransactions: { data: allTransactions, success, loading },
    } = state;

    return {
        allTransactions,
        success,
        loading,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getAllTransactions: getAllTransactionsAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(AllTransactions);
