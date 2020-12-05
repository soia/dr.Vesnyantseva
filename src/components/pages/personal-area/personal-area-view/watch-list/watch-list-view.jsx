import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import Button from '../../../../UI/button';
import { compose } from '../../../../../utils';
import { addWatchListPath } from '../../../../../constants';
import addIcon from '../../../../assets/images/icons/add-icon.svg';
import noDataIcon from '../../../../assets/images/icons/no-data-icon.svg';
import bellOnIcon from '../../../../assets/images/icons/bell-on-icon.svg';
import bellOffIcon from '../../../../assets/images/icons/bell-off-icon.svg';
import style from './watch-list.module.scss';

const WatchListView = ({ addAddress, openEdit, switchNotification }) => {
    const { t } = useTranslation();
    const textItemRender = (current, type, element) => {
        if (type === 'prev') {
            return t('previous');
        }
        if (type === 'next') {
            return t('next');
        }
        return element;
    };

    const data = [
        {
            id: 1,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            notification: true,
        },
        {
            id: 2,
            address: '0x0030a981d7afbd240x0030a981d7afbd240x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            notification: false,
        },
        {
            id: 3,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            notification: true,
        },
    ];

    const Header = () => (
        <div className={style.header}>
            <p className={style.header__title}>{t('myWatchList')}</p>
            <Link
                to={addWatchListPath}
                className={style.header__add}
                onClick={addAddress}
            >
                <img src={addIcon} alt="addIcon" /> {t('add')}
            </Link>
        </div>
    );

    if (!data.length) {
        return (
            <Fragment>
                <Header />
                <div className={style.noData}>
                    <img className={style.noData__icon} src={noDataIcon} alt="noData" />
                    <p className={style.noData__title}>{t('emptyWatchList')}</p>
                    <Link
                        to={addWatchListPath}
                        className={style.header__add}
                        onClick={addAddress}
                    >
                        <img src={addIcon} alt="addIcon" /> {t('add')}
                    </Link>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header />
            <p className={style.totalContractsFound}>
                {t('totalContractsFound', { digit: '304,730' })}
            </p>
            <div className={style.table}>
                <div className={style.table__head}>
                    <div>{t('action')}</div>
                    <div>{t('address')}</div>
                    <div>{t('balance')}</div>
                    <div>{t('notification')}</div>
                </div>
                {data.map(item => {
                    const {
                        id, address, added, balance, notification,
                    } = item;

                    return (
                        <div key={id} className={style.table__row}>
                            <div>
                                <Button
                                    className={style.table__row_button}
                                    onClick={() => openEdit(id)}
                                    type="button"
                                >
                                    {t('edit')}
                                </Button>
                            </div>
                            <div className={style.table__row_address}>
                                <span className={style.table__row_mobileTitle}>
                                    {t('address')}
                                </span>
                                <Link to={address}>{address}</Link>
                                <p>
                                    {t('addedOn')} {added}
                                </p>
                            </div>
                            <div className={style.table__row_balance}>
                                <span className={style.table__row_mobileTitle}>
                                    {t('balance')}
                                </span>
                                <p>{balance}</p>
                            </div>
                            <div
                                className={style.table__row_notification}
                                onClick={() => switchNotification(id)}
                            >
                                <span className={style.table__row_mobileTitle}>
                                    {t('notification')}
                                </span>
                                <section>
                                    <img
                                        src={notification ? bellOnIcon : bellOffIcon}
                                        alt="bell"
                                    />
                                    <p> {notification ? t('on') : t('off')}</p>
                                </section>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={style.grandTotal}>
                <div className={style.grandTotal__leftSide}>
                    {t('grandTotal')}
                    <span className={style.grandTotal__leftSide_amount}>
                        (@$366.73/BTC)
                    </span>
                </div>
                <p>$9.08</p>
            </div>
            <div className={style.pagination}>
                <Pagination
                    showTitle={false}
                    total={100}
                    itemRender={textItemRender}
                    current={2}
                    jumpNextIcon=". . ."
                />
            </div>
        </Fragment>
    );
};

WatchListView.defaultProps = {
    addAddress: () => {},
    openEdit: () => {},
    switchNotification: () => {},
};

WatchListView.propTypes = {
    addAddress: PropTypes.func,
    openEdit: PropTypes.func,
    switchNotification: PropTypes.func,
};

export default compose(connect(), withRouter)(WatchListView);
