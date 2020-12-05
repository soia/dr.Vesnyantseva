/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip } from 'antd';
import Pagination from '../../layouts/paginations';
import Spinner from '../../spinner/spinner';
import truncate from '../../../helpers/truncate-string';
import toFixedBigValue from '../../../helpers/big-number';
import getTopAccountsAction from '../../../actions/get-top-accounts.actions';
import withGetService from '../../hoc/with-get-service';
import { addressPath } from '../../../constants';
import { compose } from '../../../utils';
import mobileWidth from '../../../helpers/mobile-width';
import style from './top-accounts.module.scss';

class TopAccounts extends Component {
    static defaultProps = {
        t: () => {},
        getTopAccounts: () => {},
        topAccounts: {},
        success: false,
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getTopAccounts: PropTypes.func,
        topAccounts: PropTypes.object,
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
            topAccounts: {
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
        const { getTopAccounts } = this.props;
        getTopAccounts(itemsPerPage, numberPage);
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
            <div className={style.topAccounts}>
                <h1 className={style.topAccounts__title}>
                    {t('topAccountsByBalance', { coin: 'BTCU' })}
                </h1>
                <div className={style.table}>
                    {data.map(item => {
                        const {
                            address,
                            balance,
                            parcentage,
                            rank,
                            transactionCount,
                        } = item;

                        const toLocalString = value => {
                            const toFixed = toFixedBigValue(value, 5);
                            return (+toFixed).toLocaleString();
                        };

                        return (
                            <div key={address} className={style.table__row}>
                                <div className={style.table__column1}>
                                    <p className={style.table__label}>{t('rank')}</p>
                                    <p className={style.table__text}>{rank}</p>
                                </div>
                                <div className={style.table__column2}>
                                    <p className={style.table__label}>{t('address')}</p>
                                    <Tooltip placement="topLeft" title={address}>
                                        <Link
                                            to={`${addressPath}/${address}`}
                                            className={style.table__link}
                                        >
                                            {mobileWidth()
                                                ? truncate(address, 31)
                                                : address}
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div className={style.table__column3}>
                                    <p className={style.table__label}>{t('balance')}</p>
                                    <p className={style.table__text}>
                                        {toLocalString(balance)}
                                    </p>
                                </div>
                                <div className={style.table__column4}>
                                    <p className={style.table__label}>
                                        {t('percentage')}
                                    </p>
                                    <p className={style.table__text}>
                                        {toFixedBigValue(parcentage, 7)}%
                                    </p>
                                </div>
                                <div className={style.table__column5}>
                                    <p className={style.table__label}>{t('count')}</p>
                                    <p className={style.table__text}>
                                        {transactionCount}
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
        topAccounts: { data: topAccounts, success, loading },
    } = state;

    return {
        topAccounts,
        success,
        loading,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getTopAccounts: getTopAccountsAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(TopAccounts);
