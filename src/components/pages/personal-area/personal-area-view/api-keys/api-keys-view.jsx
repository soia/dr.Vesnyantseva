import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import PropTypes from 'prop-types';
import Button from '../../../../UI/button';
import { compose } from '../../../../../utils';
import { addApiKeysPath } from '../../../../../constants';
import addIcon from '../../../../assets/images/icons/add-icon.svg';
import noDataIcon from '../../../../assets/images/icons/no-data-icon.svg';
import style from './api-keys.module.scss';

const ApiKeysView = ({ openEdit, switchNotification }) => {
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
            key: 'TS2FKRFJEPJI8673849303TREOP2',
            added: '2020-10-10',
        },
        {
            id: 2,
            key: 'TS2FKRFJEPJI8673849303TREOP2',
            added: '2020-10-10',
        },
        {
            id: 3,
            key: 'TS2FKRFJEPJI8673849303TREOP2',
            added: '2020-10-10',
        },
    ];

    const Header = () => (
        <div className={style.header}>
            <p className={style.header__title}>{t('myAPIKeys')}</p>
            <Link to={addApiKeysPath} className={style.header__add}>
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
                    <p className={style.noData__title}>
                        {t('dontHaveAPIKeys')}
                    </p>
                    <Link to={addApiKeysPath} className={style.header__add}>
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
                {t('usedMaxQuota', { total: '3', max: '20' })}
            </p>
            <div className={style.table}>
                <div className={style.table__head}>
                    <div>{t('action')}</div>
                    <div>{t('tokenContractAddress')}</div>
                    <div>{t('created')}</div>
                </div>
                {data.map(item => {
                    const {
                        id, key, added,
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
                            <div className={style.table__row_tokenContractAddress}>
                                <span className={style.table__row_mobileTitle}>
                                    {t('tokenContractAddress')}
                                </span>
                                <p>{key}</p>
                                <span className={style.table__row_appName}>
                                    {t('appName')}: New
                                </span>
                            </div>
                            <div
                                className={style.table__row_created}
                                onClick={() => switchNotification(id)}
                            >
                                <span className={style.table__row_mobileTitle}>
                                    {t('created')}
                                </span>
                                <p> {added}</p>
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

ApiKeysView.defaultProps = {
    openEdit: () => {},
    switchNotification: () => {},
};

ApiKeysView.propTypes = {
    openEdit: PropTypes.func,
    switchNotification: PropTypes.func,
};

export default compose(connect(), withRouter)(ApiKeysView);
