import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
import style from './transaction-page.module.scss';

class Logs extends Component {
    static defaultProps = {
        t: () => {},
        match: {},
    };

    static propTypes = {
        t: PropTypes.func,
        match: PropTypes.object,
    };

    state = {
        transaction: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        this.setState({
            transaction: id,
        });
    }

    render() {
        const { t } = this.props;
        const { transaction } = this.state;
        console.log(transaction, 'transaction');
        const ADDRESS = '0x4fd06d12026024aa3fd23f31e707cf6e8975c36a54685d5654f1a868f168190e';

        return (
            <div className={style.logs}>
                <div className={style.logs__header}>
                    <p className={style.logs__title}>
                        {t('transactionReceiptEventLogs')}
                    </p>
                    <div
                        className={classNames(style.logs__left, style.logs__left_mobile)}
                    >
                        <span>69</span>
                    </div>
                </div>
                <div className={style.logs__wrapper}>
                    <div className={style.logs__left}>
                        <span>69</span>
                    </div>
                    <div>
                        <div className={style.logs__wrapper_item}>
                            <p className={style.logs__wrapper_label}>{t('address')}</p>
                            <Link className={style.logs__link} to="/">
                                {ADDRESS} {t('matchesTopics')}
                            </Link>
                        </div>
                        <div className={style.logs__wrapper_item}>
                            <p className={style.logs__wrapper_label}>{t('name')}</p>
                            <p>
                                <span className={style.logs__black}>
                                    {t('transfer')} (index_topic_1
                                </span>{' '}
                                <span className={style.logs__green}>address</span>{' '}
                                <span className={style.logs__red}>from </span>
                                <span className={style.logs__black}>
                                    index_topic_2
                                </span>{' '}
                                <span className={style.logs__green}>address</span>{' '}
                                <span className={style.logs__red}>to </span>
                                <span className={style.logs__green}>uint256</span>{' '}
                                <span className={style.logs__red}>tokens</span>
                                <span className={style.logs__black}>) </span>
                                <Link className={style.logs__link} to="/">
                                    {t('viewSource')}
                                </Link>
                            </p>
                        </div>
                        <div className={style.logs__wrapper_item}>
                            <p className={style.logs__wrapper_label}>{t('topics')}</p>
                            <div>
                                <p className={style.logs__topicItem}>
                                    <span className={style.logs__index}>0</span>
                                    <span className={style.logs__black}>{ADDRESS}</span>
                                </p>
                                <p className={style.logs__topicItem}>
                                    <span className={style.logs__index}>1</span>
                                    <span className={style.logs__dec}>Dec</span>
                                    <Link to="/" className={style.logs__link}>
                                        {ADDRESS}
                                    </Link>
                                </p>
                                <p className={style.logs__topicItem}>
                                    <span className={style.logs__index}>2</span>
                                    <span className={style.logs__dec}>Dec</span>
                                    <Link to="/" className={style.logs__link}>
                                        {ADDRESS}
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className={style.logs__wrapper_item}>
                            <p className={style.logs__wrapper_label}>{t('data')}</p>
                            <div className={style.logs__data}>
                                <span className={style.logs__data_tokens}>tokens:</span>
                                <span className={style.logs__black}>
                                    1641318590960000000000
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(Logs);
