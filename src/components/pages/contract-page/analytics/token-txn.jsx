import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { useTranslation } from 'react-i18next';
import style from './analytics.module.scss';

const TokenTxn = () => {
    const { t } = useTranslation();
    const data = [
        {
            hash: '0x8427cd64a5e1f563ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f563ec1',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x842427cd64a5e1f563ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f67563ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f556763ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1879f563ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f563ec1976b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f563456ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f5987663ec1b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
        },
        {
            hash: '0x8427cd64a5e1f563ec188675b0x8427cd64a5e1f',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            token: 'BTCU',
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
            <div className={style.internalTxn}>
                {data.map(item => {
                    const {
                        hash, age, from, to, value, token,
                    } = item;

                    return (
                        <div key={hash} className={style.internalTxn__row}>
                            <div className={style.internalTxn__column1}>
                                <p className={style.internalTxn__label}>{t('txnHash')}</p>
                                <Link to="/" className={style.internalTxn__link}>
                                    {hash}
                                </Link>
                            </div>
                            <div className={style.internalTxn__column3}>
                                <p className={style.internalTxn__label}>{t('age')}</p>
                                <p className={style.internalTxn__text}>{age}</p>
                            </div>
                            <div className={style.internalTxn__column4}>
                                <p className={style.internalTxn__label}>{t('from')}</p>
                                <Link to="/" className={style.internalTxn__link}>
                                    {from}
                                </Link>
                            </div>
                            <div className={style.internalTxn__column5}>
                                <p className={style.internalTxn__label}>{t('to')}</p>
                                <p className={style.internalTxn__text}>{to}</p>
                            </div>
                            <div className={style.internalTxn__column6}>
                                <p className={style.internalTxn__label}>{t('value')}</p>
                                <p className={style.internalTxn__text}>{value}</p>
                            </div>
                            <div className={style.internalTxn__column7}>
                                <p className={style.internalTxn__label}>{t('token')}</p>
                                <p className={style.internalTxn__text}>{token}</p>
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

export default TokenTxn;
