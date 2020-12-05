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
import getAllBlocksAction from '../../../actions/get-all-blocks.actions';
import withGetService from '../../hoc/with-get-service';
import { blockPath, addressPath } from '../../../constants';
import { compose } from '../../../utils';
import mobileWidth from '../../../helpers/mobile-width';
import style from './all-blocks.module.scss';

class AllBlocks extends Component {
    static defaultProps = {
        t: () => {},
        getAllBlocks: () => {},
        allBlocks: {},
        success: false,
        loading: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getAllBlocks: PropTypes.func,
        allBlocks: PropTypes.object,
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
            allBlocks: {
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
        const { getAllBlocks } = this.props;
        getAllBlocks(itemsPerPage, numberPage);
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
            <div className={style.allBlocks}>
                <h1 className={style.allBlocks__title}>{t('allBlocks')}</h1>
                <div className={style.table}>
                    {data.map(item => {
                        const {
                            time, height, tx, mined_by, block_reward,
                        } = item;

                        const getTime = new Date(+time);
                        const timeFromNow = moment(getTime).fromNow();

                        return (
                            <div key={height} className={style.table__row}>
                                <div className={style.table__column1}>
                                    <p className={style.table__label}>{t('block')}</p>
                                    <Link
                                        to={`${blockPath}/${height}`}
                                        className={style.table__link}
                                    >
                                        {height}
                                    </Link>
                                </div>
                                <div className={style.table__column2}>
                                    <p className={style.table__label}>{t('age')}</p>
                                    <p className={style.table__text}>{timeFromNow}</p>
                                </div>
                                <div className={style.table__column3}>
                                    <p className={style.table__label}>Txn</p>
                                    <p className={style.table__text}>
                                        {tx.length}
                                    </p>
                                </div>
                                <div className={style.table__column4}>
                                    <p className={style.table__label}>{t('miner')}</p>
                                    <Tooltip placement="topLeft" title={mined_by}>
                                        <Link
                                            to={`${addressPath}/${mined_by}`}
                                            className={style.table__link}
                                        >
                                            {mobileWidth() ? truncate(mined_by, 32) : mined_by}
                                        </Link>
                                    </Tooltip>
                                </div>
                                <div className={style.table__column5}>
                                    <p className={style.table__label}>{t('reward')}</p>
                                    <p className={style.table__text}>
                                        {toFixedBigValue(block_reward, 5)} BTCU
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
        allBlocks: { data: allBlocks, success, loading },
    } = state;

    return {
        allBlocks,
        success,
        loading,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getAllBlocks: getAllBlocksAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(AllBlocks);
