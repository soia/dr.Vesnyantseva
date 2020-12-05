import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from '../../../utils';
import ArrowDownRedFilledIcon from '../../assets/images/icons/arrow-down-red-filled-icon';
import style from './transaction-page.module.scss';

class StateBlock extends Component {
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

        return (
            <div className={style.state}>
                <div className={style.state__item}>
                    <div className={style.state__addressItem}>
                        <p className={style.state__label}>{t('address')}</p>
                        <p className={style.state__addressItem_value}>
                            0x7105ec15995a97496ec25de36cf7eec47b703375
                        </p>
                    </div>
                    <div className={style.state__beforeItem}>
                        <p className={style.state__label}>{t('before')}</p>
                        <p className={style.state__beforeItem_value}>
                            1,877.3065985 BTCU
                        </p>
                    </div>
                    <div className={style.state__afterItem}>
                        <p className={style.state__label}>{t('after')}</p>
                        <p className={style.state__beforeItem_value}>
                            1,877.3065985 BTCU
                        </p>
                    </div>
                    <div className={style.state__stateItem}>
                        <p className={style.state__label}>{t('stateDifference')}</p>
                        <p className={style.state__stateItem_value}>0.00636409180</p>
                    </div>
                </div>
                <div className={style.state__item}>
                    <div className={style.state__addressItem}>
                        <p className={style.state__label}>{t('address')}</p>
                        <p className={style.state__addressItem_value}>
                            0x7105ec15995a97496ec25de36cf7eec47b703375
                        </p>
                    </div>
                    <div className={style.state__beforeItem}>
                        <p className={style.state__label}>{t('before')}</p>
                        <p className={style.state__beforeItem_value}>
                            1,877.306598594643362884 BTCU
                        </p>
                        <p className={style.state__gray}>{t('nonce')}: 152724</p>
                    </div>
                    <div className={style.state__afterItem}>
                        <p className={style.state__label}>{t('after')}</p>
                        <p className={style.state__beforeItem_value}>
                            1,877.3065985 BTCU
                        </p>
                        <p className={style.state__gray}>{t('nonce')}: 152724</p>
                    </div>
                    <div className={style.state__stateItem}>
                        <p className={style.state__label}>{t('stateDifference')}</p>
                        <p className={style.state__stateItem_value}>0.00636409180</p>
                    </div>
                </div>
                <div className={style.state__item}>
                    <div className={style.state__addressItem}>
                        <p className={style.state__label}>{t('address')}</p>
                        <p className={style.state__addressItem_value}>
                            0x7105ec15995a97496ec25de36cf7eec47b703375
                        </p>
                    </div>
                    <div className={style.state__beforeItem}>
                        <p className={style.state__label} />
                        <p
                            className={style.state__beforeItem_value}
                            style={{ display: 'flex' }}
                        >
                            RBD{' '}
                            <span className={style.state__beforeItem_more}>
                                {t('more')} <ArrowDownRedFilledIcon />
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(StateBlock);
