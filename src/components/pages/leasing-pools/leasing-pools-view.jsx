import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import style from './leasing-pools.module.scss';

const LeasingPoolsView = ({ setFilter, filtersList }) => {
    const { t } = useTranslation();
    const data = [
        {
            rank: '1',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '2',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'Validator',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '3',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '4',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '5',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '6',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'Validator',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '7',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '8',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '9',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
        {
            rank: '10',
            block: '10923003',
            name: 'BTCU World Node',
            address: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            type: 'MasterNode',
            inLeasing: '200 BTCU',
            users: '215',
            activity: '09.10.2015',
            rating: '9.4',
        },
    ];

    const textItemRender = (current, type, element) => {
        if (type === 'prev') {
            return t('previous');
        }
        if (type === 'next') {
            return t('next');
        }
        return element;
    };

    return (
        <Fragment>
            <h1 className={style.container__title}>{t('leasingPools')}</h1>
            <div className={style.tabs}>
                <div
                    className={style.tabs__top}
                    onClick={() => setFilter(filtersList.top)}
                >
                    {t('top')}
                </div>
                <div
                    className={style.tabs__latest}
                    onClick={() => setFilter(filtersList.latest)}
                >
                    {t('latest')}
                </div>
            </div>
            <div className={style.table}>
                {data.map(item => {
                    const {
                        rank,
                        block,
                        name,
                        address,
                        type,
                        inLeasing,
                        users,
                        activity,
                        rating,
                    } = item;

                    return (
                        <div key={rank} className={style.table__row}>
                            <div className={style.table__column1}>
                                <p className={style.table__label}>{t('rank')}</p>
                                <p className={style.table__text}>{rank}</p>
                            </div>
                            <div className={style.table__column2}>
                                <p className={style.table__label}>{t('name')}</p>
                                <p className={style.table__text}>{name}</p>
                            </div>
                            <div className={style.table__column3}>
                                <p className={style.table__label}>{t('address')}</p>
                                <Link to="/" className={style.table__link}>
                                    {address}
                                </Link>
                            </div>
                            <div className={style.table__column4}>
                                <p className={style.table__label}>{t('type')}</p>
                                <p className={style.table__text}>{type}</p>
                            </div>
                            <div className={style.table__column5}>
                                <p className={style.table__label}>{t('blockHeight')}</p>
                                <p className={style.table__text}>{block}</p>
                            </div>
                            <div className={style.table__column6}>
                                <p className={style.table__label}>{t('inLeasing')}</p>
                                <p className={style.table__text}>{inLeasing}</p>
                            </div>
                            <div className={style.table__column7}>
                                <p className={style.table__label}>{t('users')}</p>
                                <p className={style.table__text}>{users}</p>
                            </div>
                            <div className={style.table__column8}>
                                <p className={style.table__label}>{t('activity')}</p>
                                <p className={style.table__text}>{activity}</p>
                            </div>
                            <div className={style.table__column9}>
                                <p className={style.table__label}>{t('rating')}</p>
                                <p className={style.table__text}>{rating}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                showTitle={false}
                total={100}
                itemRender={textItemRender}
                current={2}
                jumpNextIcon=". . ."
            />
        </Fragment>
    );
};

LeasingPoolsView.defaultProps = {
    setFilter: () => {},
    filtersList: {},
};

LeasingPoolsView.propTypes = {
    setFilter: PropTypes.func,
    filtersList: PropTypes.object,
};

export default LeasingPoolsView;
