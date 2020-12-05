/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Pagination from '../../../layouts/paginations';
import truncate from '../../../../helpers/truncate-string';
import mobileWidth from '../../../../helpers/mobile-width';
import toFixedBigValue from '../../../../helpers/big-number';
import { transactionPath, blockPath, addressPath } from '../../../../constants';
import style from './transactions.module.scss';

const Transactions = ({
    records,
    changePagination,
    currentPageNumber,
    numItemsPerPage,
    data,
    totalCount,
}) => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className={style.transactions}>
                {data.map(item => {
                    const {
                        hash, block_id, time, from, to, output_total, fee,
                    } = item;

                    const getTime = new Date(+time);
                    const timeFromNow = moment(getTime).fromNow();

                    return (
                        <div key={hash} className={style.transactions__row}>
                            <div className={style.transactions__column1}>
                                <p className={style.transactions__label}>
                                    {t('txnHash')}
                                </p>
                                <Tooltip placement="topLeft" title={hash}>
                                    <Link
                                        to={`${transactionPath}/${hash}`}
                                        className={style.transactions__link}
                                    >
                                        {`${truncate(hash, mobileWidth() ? 15 : 23)}`}
                                    </Link>
                                </Tooltip>
                            </div>
                            <div className={style.transactions__column2}>
                                <p className={style.transactions__label}>{t('block')}</p>
                                <Link
                                    to={`${blockPath}/${block_id}`}
                                    className={style.transactions__link}
                                >
                                    {block_id}
                                </Link>
                            </div>
                            <div className={style.transactions__column3}>
                                <p className={style.transactions__label}>{t('age')}</p>
                                <p className={style.transactions__text}>{timeFromNow}</p>
                            </div>
                            <div className={style.transactions__column4}>
                                <p className={style.transactions__label}>{t('from')}</p>
                                {from.length ? (
                                    <Tooltip placement="topLeft" title={from[0]}>
                                        <Link
                                            to={`${addressPath}/${from[0]}`}
                                            className={style.transactions__link}
                                        >
                                            {mobileWidth()
                                                ? truncate(from[0], 15)
                                                : truncate(from[0], 26)}
                                        </Link>
                                    </Tooltip>
                                ) : (
                                    <span>{t('generationFees')}</span>
                                )}
                            </div>
                            <div className={style.transactions__column5}>
                                <p className={style.transactions__label}>{t('to')}</p>
                                <p className={style.transactions__text}>
                                    {to.length ? (
                                        <Tooltip placement="topLeft" title={to[0]}>
                                            <Link
                                                to={`${addressPath}/${to[0]}`}
                                                className={style.transactions__link}
                                            >
                                                {mobileWidth()
                                                    ? truncate(to[0], 15)
                                                    : truncate(to[0], 26)}
                                            </Link>
                                        </Tooltip>
                                    ) : (
                                        <span>{t('generationFees')}</span>
                                    )}
                                </p>
                            </div>
                            <div className={style.transactions__column6}>
                                <p className={style.transactions__label}>{t('value')}</p>
                                <p className={style.transactions__text}>
                                    {toFixedBigValue(output_total, 5)}
                                </p>
                            </div>
                            <div className={style.transactions__column7}>
                                <p className={style.transactions__label}>
                                    [Txn {t('fee')}]
                                </p>
                                <p className={style.transactions__text}>
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
                recordsOnClick={records}
                paginationOnChange={changePagination}
            />
        </Fragment>
    );
};

Transactions.defaultProps = {
    records: () => {},
    changePagination: () => {},
    currentPageNumber: '',
    numItemsPerPage: '',
    data: '',
    totalCount: '',
};

Transactions.propTypes = {
    records: PropTypes.func,
    changePagination: PropTypes.func,
    currentPageNumber: PropTypes.any,
    numItemsPerPage: PropTypes.any,
    data: PropTypes.instanceOf(Array),
    totalCount: PropTypes.any,
};

export default Transactions;
