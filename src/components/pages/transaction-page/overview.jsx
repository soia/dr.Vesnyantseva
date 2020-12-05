/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import truncate from '../../../helpers/truncate-string';
import toFixedBigValue from '../../../helpers/big-number';
import copyToClipboard from '../../../helpers/copy-to-clipboard';
import notification from '../../../helpers/notifications';
import { compose } from '../../../utils';
import CopyIcon from '../../assets/images/icons/copy-icon';
import ClockIcon from '../../assets/images/icons/clock-icon';
import { loginPath, blockPath, addressPath } from '../../../constants/pathLocation';
import mobileWidth from '../../../helpers/mobile-width';
import successIcon from '../../assets/images/icons/success-icon.svg';
import style from './transaction-page.module.scss';

class Overview extends Component {
    static defaultProps = {
        t: () => {},
        transactionInfo: {},
        loggingIn: false,
    };

    static propTypes = {
        t: PropTypes.func,
        transactionInfo: PropTypes.object,
        loggingIn: PropTypes.bool,
    };

    copied = value => {
        const { t } = this.props;
        copyToClipboard(value);
        notification(t('successNotification'), t('сopiedToClipboard'), 'success');
    };

    render() {
        const {
            t,
            transactionInfo: {
                output_total,
                hash,
                block_id,
                time,
                outputs,
                inputs,
                confirmations,
                from,
                to,
            },
            loggingIn,
        } = this.props;
        const getTime = new Date(+time);
        const timeFromNow = moment(getTime).fromNow();

        const InputsBlock = () => (
            <div className={style.inputs}>
                {inputs.length ? (
                    <p className={style.inputs__title}>{t('inputs')}</p>
                ) : null}

                {inputs.map(item => {
                    const { index, time: id } = item;
                    return (
                        <div key={id} className={style.inputs__wrapper}>
                            <div className={style.inputs__indexItem}>
                                <p className={style.inputs__label}>{t('index')}</p>
                                <p className={style.inputs__black}>{index}</p>
                            </div>
                            <div className={style.inputs__outputItem}>
                                <p className={style.inputs__label}>
                                    {t('previousOutput')}
                                </p>
                                <Link to="/" className={style.inputs__outputItem_output}>
                                    85a0d38c114847dfjhfjewfhj234
                                </Link>
                                <p style={{ whiteSpace: 'nowrap' }}>
                                    <span className={style.inputs__black}>{t('in')}</span>{' '}
                                    <Link
                                        to="/"
                                        className={style.inputs__outputItem_block}
                                    >
                                        2454114
                                    </Link>
                                </p>
                            </div>
                            <div className={style.inputs__addressItem}>
                                <p className={style.inputs__label}>{t('address')}</p>
                                <Link
                                    to="/"
                                    className={style.inputs__addressItem_address}
                                >
                                    D6WRqaYKyUpA5TzeJ9386KTupo817eXmD6WRqaYKyUpA5TzeJ9386KTupo817eXm..
                                </Link>
                            </div>
                            <div className={style.inputs__addressItem}>
                                <p className={style.inputs__label}>{t('amount')}</p>
                                <p className={style.inputs__black}>514.14285714 BTCU</p>
                            </div>
                        </div>
                    );
                })}

                {outputs.length ? (
                    <p className={style.inputs__title}>{t('outputs')}</p>
                ) : null}
                {outputs.map((item, id) => {
                    const { index, recipient, value } = item;

                    return (
                        <div key={id} className={style.inputs__wrapper}>
                            <div className={style.inputs__indexItem}>
                                <p className={style.inputs__label}>{t('index')}</p>
                                <p className={style.inputs__black}>{index}</p>
                            </div>
                            <div className={style.inputs__outputItem}>
                                <p className={style.inputs__label}>{t('redeemedIn')}</p>
                                <p className={style.inputs__gray}>
                                    {t('notYetRedeemed')}
                                </p>
                            </div>
                            <div className={style.inputs__addressItem}>
                                <p className={style.inputs__label}>{t('address')}</p>
                                <Link
                                    to={`${addressPath}/${recipient}`}
                                    className={style.inputs__addressItem_address}
                                >
                                    {recipient}
                                </Link>
                            </div>
                            <div className={style.inputs__addressItem}>
                                <p className={style.inputs__label}>{t('amount')}</p>
                                <p className={style.inputs__black}>
                                    {toFixedBigValue(value, 5)} BTCU
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <Fragment>
                <div className={style.totalOutput}>
                    <div className={style.totalOutput__top}>
                        <span className={style.totalOutput__top_totalOutput}>
                            {t('totalOutput')}:
                        </span>
                        <span className={style.totalOutput__top_amount}>
                            {toFixedBigValue(output_total, 5)} BTCU
                        </span>
                        ($550.00)
                        <img
                            className={style.totalOutput__top_icon}
                            src={successIcon}
                            alt="icon"
                        />
                        <span className={style.totalOutput__top_success}>
                            {t('success')}
                        </span>
                    </div>
                    <div className={style.totalOutput__bottom}>
                        <Moment format="DD.MM.YYYY, hh:mm A" unix>
                            {time / 1000}
                        </Moment>{' '}
                        &nbsp;
                        {t('extractedProofOfStake')}
                    </div>
                </div>
                <div className={style.transBlock}>
                    <div className={style.transBlock__hash}>
                        <p className={style.transBlock__label}>{t('transactionHash')}:</p>
                        <div className={style.transBlock__hashWrapper}>
                            <p>{mobileWidth() ? truncate(hash, 30) : hash}</p>
                            <div
                                onClick={() => this.copied(hash)}
                                className={style.transBlock__copy}
                            >
                                <CopyIcon />
                            </div>
                        </div>
                    </div>
                    <div className={style.transBlock__block}>
                        <p className={style.transBlock__label}>{t('block')}:</p>
                        <div>
                            <Link
                                to={`${blockPath}/${block_id}`}
                                className={style.transBlock__block_blockNumber}
                            >
                                {block_id}
                            </Link>
                            <span className={style.transBlock__block_confirmations}>
                                {confirmations} {t('blockConfirmations')}
                            </span>
                        </div>
                    </div>
                    <div className={style.transBlock__timestamp}>
                        <p className={style.transBlock__label}>{t('timestamp')}:</p>
                        <div className={style.transBlock__timestampWrapper}>
                            <p className={style.transBlock__timestampWrapper_left}>
                                <ClockIcon />
                                {timeFromNow} (
                                <Moment format="DD.MM.YYYY, hh:mm A" unix>
                                    {time / 1000}
                                </Moment>
                                )
                            </p>
                            <p className={style.transBlock__timestampWrapper_right}>
                                <ClockIcon />
                                {t('confirmedWithinSecs', { digit: 30 })}
                            </p>
                        </div>
                    </div>
                    <div className={style.transBlock__from}>
                        <p className={style.transBlock__label}>{t('from')}:</p>
                        <div className={style.transBlock__fromWrapper}>
                            {from.length ? (
                                <Fragment>
                                    <Link
                                        to={`${addressPath}/${from}`}
                                        className={style.transactions__link}
                                    >
                                        {mobileWidth()
                                            ? truncate(from.toString(), 26)
                                            : from}
                                    </Link>
                                    <div
                                        onClick={() => this.copied(from)}
                                        className={style.transBlock__copy}
                                    >
                                        <CopyIcon />
                                    </div>
                                    <img
                                        className={style.transBlock__from_successIcon}
                                        src={successIcon}
                                        alt="icon"
                                    />
                                </Fragment>
                            ) : (
                                <span className={style.transBlock__label}>
                                    {t('generationFees')}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={style.transBlock__interacted}>
                        <p className={style.transBlock__label}>{t('to')}:</p>
                        <div className={style.transBlock__fromWrapper}>
                            {to.length ? (
                                <Fragment>
                                    <Link
                                        to={`${addressPath}/${to}`}
                                        className={style.transactions__link}
                                    >
                                        {mobileWidth() ? truncate(to.toString(), 26) : to}
                                    </Link>
                                    <div
                                        onClick={() => this.copied(to)}
                                        className={style.transBlock__copy}
                                    >
                                        <CopyIcon />
                                    </div>
                                </Fragment>
                            ) : (
                                <span className={style.transBlock__label}>
                                    {t('includedfollowingTx')}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {outputs.length || inputs.length ? <InputsBlock /> : null}
                <div className={style.privateNote}>
                    {loggingIn ? (
                        'Lorem Ipsum '
                    ) : (
                        <Fragment>
                            {t('privateNote')}: {t('yoAccessPrivateNote')}{' '}
                            <Link to={loginPath}>{t('loggedIn')}</Link>
                        </Fragment>
                    )}
                </div>
            </Fragment>
        );
    }
}

export default compose(withTranslation(), withRouter)(Overview);
