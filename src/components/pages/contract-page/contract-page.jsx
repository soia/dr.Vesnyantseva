/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import notification from '../../../helpers/notifications';
import copyToClipboard from '../../../helpers/copy-to-clipboard';
import Transactions from './transactions';
import InternalTxn from './internal-txn';
import Contract from './contract/contract';
import Analytics from './analytics';
import Info from './info';
import TokenTxn from './token-txn';
import Comments from '../../layouts/comments';
import DropDown from '../../UI/drop-down';
import ModalWindow from '../../UI/modal-window';
import qrCodeIcon from '../../assets/images/icons/qr-code-icon.svg';
import tokenIcon from '../../assets/images/icons/token-icon.svg';
import CopyIcon from '../../assets/images/icons/copy-icon';
import { compose } from '../../../utils';
import style from './contract-page.module.scss';

class ContractPage extends Component {
    static defaultProps = {
        t: () => {},
        match: {},
    };

    static propTypes = {
        t: PropTypes.func,
        match: PropTypes.object,
    };

    state = {
        address: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        this.setState({
            address: id,
        });
    }

    copied = address => {
        const { t } = this.props;
        copyToClipboard(address);
        notification(t('successNotification'), t('сopiedToClipboard'), 'success');
    };

    render() {
        const { t } = this.props;
        const { address } = this.state;
        const { TabPane } = Tabs;

        const dropDownList = [
            {
                title: 'Afiikiticate (AUC)',
                amount: '0.32313',
                logo: tokenIcon,
            },
            {
                title: 'Afiikiticate2 (AUC)',
                amount: '0.32313',
                logo: tokenIcon,
            },
            {
                title: 'Afiikiticate3 (AUC)',
                amount: '0.32313',
                logo: tokenIcon,
            },
            {
                title: 'Afiikiticate4 (AUC)',
                amount: '0.32313',
                logo: tokenIcon,
            },
            {
                title: 'Afiikiticate5 (AUC)',
                amount: '0.32313',
                logo: tokenIcon,
            },
        ];

        return (
            <div className={style.contract}>
                <div className={style.contract__header}>
                    <h1 className={style.contract__title}>{t('contract')}</h1>
                    <span className={style.contract__header_address}>{address}</span>
                    <div
                        onClick={() => this.copied(address)}
                        className={style.contract__copyIcon}
                    >
                        <CopyIcon />
                    </div>
                    <ModalWindow
                        triggerButton={(
                            <div
                                className={style.contract__qrCodeIcon}
                            >
                                <img src={qrCodeIcon} alt="qrCodeIcon" />
                            </div>
                        )}
                    >
                        <div className="modalQRCode">
                            <div
                                onClick={() => this.copied(address)}
                                className="modalQRCode__address"
                            >
                                {address}
                            </div>
                            <QRCode value={address} />
                        </div>
                    </ModalWindow>
                </div>
                <div className={style.topBlock}>
                    <div className={style.topBlock__item}>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>
                                {t('contractOverview')}
                            </p>
                            <p className={style.topBlock__blackText}>0 BTC</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('balance')}:</p>
                            <p className={style.topBlock__blackText}>$0.00</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('btcValue')}:</p>
                            <p className={style.topBlock__blackText}>$0.00</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('token')}:</p>
                            <DropDown
                                placeholder={t('tokens')}
                                dropDownList={dropDownList}
                            />
                        </div>
                    </div>
                    <div className={style.topBlock__item}>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('moreInfo')}</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('myNameTag')}:</p>
                            <p className={style.topBlock__blackText}>
                                {t('notAvailable')},{' '}
                                <Link className={style.topBlock__link} to="/">
                                    {t('loginToUpdate')}
                                </Link>
                            </p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>
                                {t('contractCreator')}:
                            </p>
                            <div className={style.topBlock__contractCreator}>
                                <Link className={style.topBlock__link} to="/">
                                    0x67cb1274387b6741741
                                </Link>
                                &nbsp;
                                <span className={style.topBlock__blackText}>at txn</span>
                                &nbsp;
                                <Link className={style.topBlock__link} to="/">
                                    0x600ad4646b30a0323618
                                </Link>
                            </div>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('tokenTracker')}:</p>
                            <p className={style.topBlock__blackText}>
                                <Link className={style.topBlock__link} to="/">
                                    Money Plant Token (MPT)
                                </Link>{' '}
                                (@$0.0604)
                            </p>
                        </div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('transactions')} key="1">
                        <Transactions />
                    </TabPane>
                    <TabPane tab={t('internalTxns')} key="2">
                        <InternalTxn />
                    </TabPane>
                    <TabPane tab={t('erc20TokenTxns')} key="3">
                        <TokenTxn />
                    </TabPane>
                    <TabPane tab={t('contract')} key="4">
                        <Contract />
                    </TabPane>
                    <TabPane tab={t('analytics')} key="5">
                        <Analytics />
                    </TabPane>
                    <TabPane tab={t('info')} key="6">
                        <Info />
                    </TabPane>
                    <TabPane tab={t('comments')} key="7">
                        <Comments />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(ContractPage);
