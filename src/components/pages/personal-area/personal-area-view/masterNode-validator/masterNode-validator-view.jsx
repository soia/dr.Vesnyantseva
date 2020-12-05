import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../../../UI/button';
import { compose } from '../../../../../utils';
import { addMasterNodeValidatorPath } from '../../../../../constants';
import addIcon from '../../../../assets/images/icons/add-icon.svg';
import noDataIcon from '../../../../assets/images/icons/no-data-icon.svg';
import style from './masterNode-validator.module.scss';

const MasterNodeValidatorView = ({
    addAddress, openEdit, more, activeMoreTab,
}) => {
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
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 2,
            address: '0x0030a981d7afbd240x0030a981d7afbd240x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 3,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 4,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 5,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 6,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
        {
            id: 7,
            address: '0x0030a981d7afbd24',
            added: '2020-10-10',
            balance: '0.02476322 BTCU ($9.08)',
            type: t('validator'),
            name: 'Rolan2020',
        },
    ];

    const Header = () => (
        <div className={style.header}>
            <p className={style.header__title}>{t('masterNodeValidator')}</p>
            <Link
                to={addMasterNodeValidatorPath}
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
                    <p className={style.noData__title}>{t('emptyValidatorList')}</p>
                    <Link
                        to={addMasterNodeValidatorPath}
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
                {t('totalMasternodesFound', { digit: '2' })}
            </p>
            <div className={style.table}>
                <div className={style.table__head}>
                    <div>{t('action')}</div>
                    <div>{t('type')}</div>
                    <div>{t('name')}</div>
                    <div>{t('address')}</div>
                    <div>{t('balance')}</div>
                    <div />
                </div>
                {data.map(item => {
                    const {
                        id, address, added, balance, type, name,
                    } = item;

                    const moreStyle = activeMoreTab === id
                        ? classNames(style.more, style.moreActive)
                        : style.more;

                    const moreText = activeMoreTab === id
                        ? t('hide')
                        : t('more');

                    return (
                        <div key={id} className={style.table__rowWrapper}>
                            <div className={style.table__row}>
                                <div>
                                    <Button
                                        className={style.table__row_button}
                                        onClick={() => openEdit(id)}
                                        type="button"
                                    >
                                        {t('edit')}
                                    </Button>
                                </div>
                                <div className={style.table__row_content}>
                                    <span className={style.table__row_mobileTitle}>
                                        {t('type')}
                                    </span>
                                    <p>{type}</p>
                                </div>
                                <div className={style.table__row_content}>
                                    <span className={style.table__row_mobileTitle}>
                                        {t('name')}
                                    </span>
                                    <p>{name}</p>
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
                                <div className={style.table__row_content}>
                                    <span className={style.table__row_mobileTitle}>
                                        {t('balance')}
                                    </span>
                                    <p>{balance}</p>
                                </div>
                                <div
                                    className={style.table__row_more}
                                    onClick={() => more(id)}
                                >
                                    {moreText}
                                </div>
                            </div>
                            <div className={moreStyle}>
                                <div className={style.more__item}>
                                    <p className={style.more__title}>
                                        {t('nodeLeasing')}
                                    </p>
                                    <p className={style.more__value}>20130030</p>
                                </div>
                                <div className={style.more__item}>
                                    <p className={style.more__title}>
                                        {t('leasingCoeff')}
                                    </p>
                                    <p className={style.more__value}>0.7</p>
                                </div>
                                <div className={style.more__item}>
                                    <p className={style.more__title}>
                                        {t('leasingAmountCoeff')}
                                    </p>
                                    <p className={style.more__value}>0.8</p>
                                </div>
                                <div className={style.more__item}>
                                    <p className={style.more__title}>
                                        {t('leasingTimeCoeff')}
                                    </p>
                                    <p className={style.more__value}>1.7</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
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

MasterNodeValidatorView.defaultProps = {
    addAddress: () => {},
    openEdit: () => {},
    more: () => {},
    activeMoreTab: '',
};

MasterNodeValidatorView.propTypes = {
    addAddress: PropTypes.func,
    openEdit: PropTypes.func,
    more: PropTypes.func,
    activeMoreTab: PropTypes.any,
};

export default compose(connect(), withRouter)(MasterNodeValidatorView);
