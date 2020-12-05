import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { useTranslation } from 'react-i18next';
import style from './transactions.module.scss';

const Transactions = () => {
    const { t } = useTranslation();
    const data = [
        {
            hash: '0x8427cd64a5e1f563ec1b0x8427cd64a5e1f',
            block: '10923003109230031092300310923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f563ec1',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x842427cd64a5e1f563ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f67563ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f556763ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1879f563ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f563ec1976b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f563456ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f5987663ec1b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
        },
        {
            hash: '0x8427cd64a5e1f563ec188675b0x8427cd64a5e1f',
            block: '10923003',
            age: '10 hrs 22 mins ago',
            from: '0x0030a981d7afbd2408465fdd30x0030a981d7afbd2408465fdd3',
            to: 'Money Plant: MPT Token',
            value: '100.12345678 BTC',
            fee: '0.123456789',
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
            <div className={style.transactions}>
                {data.map(item => {
                    const {
                        hash, block, age, from, to, value, fee,
                    } = item;

                    return (
                        <div key={hash} className={style.transactions__row}>
                            <div className={style.transactions__column1}>
                                <p className={style.transactions__label}>{t('txnHash')}</p>
                                <Link to="/" className={style.transactions__link}>
                                    {hash}
                                </Link>
                            </div>
                            <div className={style.transactions__column2}>
                                <p className={style.transactions__label}>{t('block')}</p>
                                <Link to="/" className={style.transactions__link}>
                                    {block}
                                </Link>
                            </div>
                            <div className={style.transactions__column3}>
                                <p className={style.transactions__label}>{t('age')}</p>
                                <p className={style.transactions__text}>{age}</p>
                            </div>
                            <div className={style.transactions__column4}>
                                <p className={style.transactions__label}>{t('from')}</p>
                                <Link to="/" className={style.transactions__link}>
                                    {from}
                                </Link>
                            </div>
                            <div className={style.transactions__column5}>
                                <p className={style.transactions__label}>{t('to')}</p>
                                <p className={style.transactions__text}>{to}</p>
                            </div>
                            <div className={style.transactions__column6}>
                                <p className={style.transactions__label}>{t('value')}</p>
                                <p className={style.transactions__text}>{value}</p>
                            </div>
                            <div className={style.transactions__column7}>
                                <p className={style.transactions__label}>[Txn {t('fee')}]</p>
                                <p className={style.transactions__text}>{fee}</p>
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

export default Transactions;
