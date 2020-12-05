/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../spinner/spinner';
import truncate from '../../../helpers/truncate-string';
import withGetService from '../../hoc/with-get-service';
import notification from '../../../helpers/notifications';
import copyToClipboard from '../../../helpers/copy-to-clipboard';
import Transactions from './transactions';
import Analytics from './analytics';
import Comments from '../../layouts/comments';
import ModalWindow from '../../UI/modal-window';
import { loginPath } from '../../../constants';
import getTransactionsByAddressAction from '../../../actions/get-transactions-by-address.actions';
import getAddressChartAction from '../../../actions/get-address-chart.actions';
import getAddressInfoAction from '../../../actions/get-address-info.actions';
import CopyIcon from '../../assets/images/icons/copy-icon';
import addIcon from '../../assets/images/icons/add-icon.svg';
import eyeIcon from '../../assets/images/icons/eye-icon.svg';
import qrCodeIcon from '../../assets/images/icons/qr-code-icon.svg';
import notFoundIcon from '../../assets/images/icons/search-not-found.svg';
import { compose } from '../../../utils';
import mobileWidth from '../../../helpers/mobile-width';
import style from './address-page.module.scss';

class AddressPage extends Component {
    static defaultProps = {
        t: () => {},
        getAddressInfo: () => {},
        getTransactionsByAddress: () => {},
        getAddressChart: () => {},
        match: {},
        addressInfo: {},
        transactionsByAddress: {},
        addressChart: [],
        loggingIn: false,
        loading: false,
        success: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getAddressInfo: PropTypes.func,
        getTransactionsByAddress: PropTypes.func,
        getAddressChart: PropTypes.func,
        match: PropTypes.object,
        addressInfo: PropTypes.object,
        transactionsByAddress: PropTypes.object,
        addressChart: PropTypes.instanceOf(Array),
        loggingIn: PropTypes.bool,
        loading: PropTypes.bool,
        success: PropTypes.bool,
    };

    state = {
        address: '',
        currentPageNumber: '',
        numItemsPerPage: '',
        data: [],
        totalCount: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
            getAddressChart,
        } = this.props;

        this.setState(
            {
                address: id,
            },
            () => {
                this.loadData();
                this.loadTransactions(10, 1);
                getAddressChart(id);
            },
        );
    }

    componentDidUpdate(prevProps) {
        const {
            success,
            transactionsByAddress: {
                currentPageNumber,
                numItemsPerPage,
                items,
                totalCount,
            },
        } = this.props;

        if (success && success !== prevProps.success) {
            this.setState({
                currentPageNumber,
                numItemsPerPage,
                data: items,
                totalCount,
            });
        }

        const {
            match: {
                params: { id },
            },
            getAddressChart,
        } = this.props;

        if (id !== prevProps.match.params.id) {
            this.setState(
                {
                    address: id,
                },
                () => {
                    this.loadData();
                    this.loadTransactions(10, 1);
                    getAddressChart(id);
                },
            );
        }
    }

    loadData = () => {
        const { getAddressInfo } = this.props;
        const { address } = this.state;
        getAddressInfo(address);
    };

    loadTransactions = (itemsPerPage, numberPage) => {
        const { getTransactionsByAddress } = this.props;
        const { address } = this.state;
        getTransactionsByAddress(itemsPerPage, numberPage, address);
    };

    changePagination = number => {
        const { numItemsPerPage } = this.state;

        this.loadTransactions(numItemsPerPage, number);
    };

    records = records => {
        this.loadTransactions(records, 1);
    };

    copied = address => {
        const { t } = this.props;
        copyToClipboard(address);
        notification(t('successNotification'), t('сopiedToClipboard'), 'success');
    };

    render() {
        const {
            t,
            addressInfo,
            addressInfo: { balance },
            loggingIn,
            loading,
            addressChart,
        } = this.props;
        const {
            address,
            currentPageNumber,
            numItemsPerPage,
            data,
            totalCount,
        } = this.state;
        const { TabPane } = Tabs;

        if (loading) {
            return <Spinner />;
        }

        if (!Object.keys(addressInfo).length) {
            return (
                <div className={style.notFoundIcon}>
                    <img src={notFoundIcon} alt="notFoundIcon" />
                    <p className={style.notFoundIcon__title}>{t('nothingFound')}</p>
                </div>
            );
        }

        const isTag = 'My tag';

        let tagInfo = (
            <Fragment>
                {' '}
                {t('notAvailable')},{' '}
                <Link
                    className={style.topBlock__link}
                    to={loginPath}
                >
                    {t('loginToUpdate')}
                </Link>
            </Fragment>
        );

        if (loggingIn) {
            tagInfo = (
                <Link to="/" className={style.addNewTag}>
                    <img src={addIcon} alt="addIcon" />
                    {t('addNewTag')}
                </Link>
            );
        }

        if (loggingIn && isTag) {
            tagInfo = (
                <div className={style.tagInfoWrapper}>
                    <p className={style.tagInfoWrapper__tag}>
                        {isTag}
                    </p>
                    <Link to="/" className={style.addNewTag}>
                        <img src={eyeIcon} alt="eyeIcon" />
                        {t('edit')}
                    </Link>
                </div>
            );
        }

        return (
            <div className={style.address} id="addressPage">
                <div className={style.address__header}>
                    <h1 className={style.address__title}>{t('address')}</h1>
                    <span className={style.address__header_address}>
                        {mobileWidth() ? truncate(address, 30) : address}
                    </span>
                    <div
                        onClick={() => this.copied(address)}
                        className={style.address__copyIcon}
                    >
                        <CopyIcon />
                    </div>
                    <ModalWindow
                        triggerButton={(
                            <div className={style.address__qrCodeIcon}>
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
                            <p className={style.topBlock__title}>
                                {t('addressOverview')}
                            </p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('balance')}:</p>
                            <p className={style.topBlock__blackText}>$0.00</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('value')}:</p>
                            <p className={style.topBlock__blackText}>
                                {balance.toLocaleString()} BTCU
                            </p>
                        </div>
                    </div>
                    <div className={style.topBlock__item}>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__title}>{t('moreInfo')}</p>
                        </div>
                        <div className={style.topBlock__row}>
                            <p className={style.topBlock__label}>{t('myNameTag')}:</p>
                            <p className={style.topBlock__blackText}>
                                {tagInfo}
                            </p>
                        </div>
                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('transactions')} key="1">
                        <Transactions
                            currentPageNumber={currentPageNumber}
                            numItemsPerPage={numItemsPerPage}
                            data={data}
                            totalCount={totalCount}
                            records={this.records}
                            changePagination={this.changePagination}
                        />
                    </TabPane>
                    <TabPane tab={t('analytics')} key="2">
                        <Analytics addressChart={addressChart} />
                    </TabPane>
                    <TabPane tab={t('comments')} key="3">
                        <Comments />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        addressInfo: { data: addressInfo, loading },
        authentication: { loggingIn },
        transactionsByAddress: { data: transactionsByAddress, success },
        addressChart: { data: addressChart },
    } = state;

    return {
        addressInfo,
        loading,
        loggingIn,
        transactionsByAddress,
        success,
        addressChart,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getAddressInfo: getAddressInfoAction(getService),
        getAddressChart: getAddressChartAction(getService),
        getTransactionsByAddress: getTransactionsByAddressAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(AddressPage);
