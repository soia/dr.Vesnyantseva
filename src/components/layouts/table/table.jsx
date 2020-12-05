/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import toFixedBigValue from '../../../helpers/big-number';
import Button from '../../UI/button/button';
import transactionDataHelper from '../../../helpers/transaction-data-helper';
import modlIcon from '../../assets/images/logos/modl-logo.svg';
import style from './table.module.scss';

const Table = ({
    button, onClick, buttonIcon, buttonText, transactions,
}) => {
    const { t } = useTranslation();

    if (!transactions.lenth) {
        return <p className={style.noTransactionsYet}>{t('noTransactionsYet')}</p>;
    }

    return (
        <div className={style.table}>
            <div className={style.table__header}>
                <p className={style.table__header_th}>{t('operation')}</p>
                <p className={style.table__header_th}>{t('date')}</p>
                <p className={style.table__header_th}>{t('status')}</p>
                <p className={style.table__header_th}>{t('amount')}</p>
            </div>
            <div className={style.table__body}>
                {transactions.map(item => {
                    const result = transactionDataHelper(item, t);
                    const {
                        id, type, created_at, status, oldStatus, amount,
                    } = result;

                    let dotStyle = '';
                    if (oldStatus === 'done') dotStyle = style.table__body_dotGreen;
                    if (oldStatus === 'false') dotStyle = style.table__body_dotRed;
                    if (oldStatus === 'IN_PROGRESS') { dotStyle = style.table__body_dotYellow; }

                    return (
                        <div key={id} className={style.table__body_item}>
                            <p className={style.table__body_td}>{type}</p>
                            <p className={style.table__body_td}>
                                <Moment format="DD.MM.YYYY, hh:mm A" unix>
                                    {created_at}
                                </Moment>
                            </p>
                            <p className={style.table__body_td}>
                                {status}
                                <span className={dotStyle} />
                            </p>
                            <p className={style.table__body_td}>
                                {toFixedBigValue(amount, 6)}
                                <img
                                    className={style.table__body_tdIcon}
                                    src={modlIcon}
                                    alt="modlIcon"
                                />
                            </p>
                        </div>
                    );
                })}
            </div>
            {button ? (
                <Button type="button" className={style.button} onClick={onClick}>
                    {buttonIcon}
                    <div className={style.button__text}>{buttonText}</div>
                </Button>
            ) : null}
        </div>
    );
};

Table.defaultProps = {
    onClick: () => {},
    buttonIcon: {},
    buttonText: '',
    button: false,
    transactions: [],
};

Table.propTypes = {
    button: PropTypes.bool,
    buttonIcon: PropTypes.object,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    transactions: PropTypes.instanceOf(Array),
};

export default Table;
