import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Spinner from '../../spinner/spinner';
import Overview from './overview';
import StateBlock from './state-block';
import Comments from '../../layouts/comments';
import Logs from './logs';
import { compose } from '../../../utils';
import Code from './raw-block';
import withGetService from '../../hoc/with-get-service';
import getTransactionInfoAction from '../../../actions/get-transaction-info.actions';
import notFoundIcon from '../../assets/images/icons/search-not-found.svg';
import style from './transaction-page.module.scss';

class TransactionPage extends Component {
    static defaultProps = {
        t: () => {},
        getTransactionInfo: () => {},
        match: {},
        transactionInfo: {},
        loading: false,
        loggingIn: false,
    };

    static propTypes = {
        t: PropTypes.func,
        getTransactionInfo: PropTypes.func,
        match: PropTypes.object,
        transactionInfo: PropTypes.object,
        loading: PropTypes.bool,
        loggingIn: PropTypes.bool,
    };

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        if (id !== prevProps.match.params.id) {
            this.loadData();
        }
    }


    loadData = () => {
        const {
            getTransactionInfo,
            match: {
                params: { id },
            },
        } = this.props;
        getTransactionInfo(id);
    };

    render() {
        const {
            t, transactionInfo, loading, loggingIn,
        } = this.props;
        const { TabPane } = Tabs;

        if (loading) {
            return <Spinner />;
        }

        if (!Object.keys(transactionInfo).length) {
            return (
                <div className={style.notFoundIcon}>
                    <img src={notFoundIcon} alt="notFoundIcon" />
                    <p className={style.notFoundIcon__title}>{t('nothingFound')}</p>
                </div>
            );
        }

        return (
            <div className={style.block}>
                <h1 className={style.block__title}>{t('transactionDetails')}</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={t('overview')} key="1">
                        <Overview
                            transactionInfo={transactionInfo}
                            loggingIn={loggingIn}
                        />
                    </TabPane>
                    <TabPane tab={t('rawTransaction')} key="2">
                        <div className={style.rawBlock}>
                            <div className={style.rawBlock__wrapper}>
                                <Code code={transactionInfo} />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={t('logs')} key="3">
                        <Logs />
                    </TabPane>
                    <TabPane tab={t('state')} key="4">
                        <StateBlock />
                    </TabPane>
                    <TabPane tab={t('comments')} key="5">
                        <Comments />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        transactionInfo: { data: transactionInfo, loading },
        authentication: { loggingIn },
    } = state;

    return {
        transactionInfo,
        loading,
        loggingIn,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getTransactionInfo: getTransactionInfoAction(getService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(TransactionPage);
