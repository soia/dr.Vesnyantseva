import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import Field from '../../../../UI/field/field';
import withGetService from '../../../../hoc/with-get-service';
import { compose } from '../../../../../utils';
import InfoIcon from '../../../../assets/images/icons/info_icon';
import Button from '../../../../UI/button/button';
import { watchListPath } from '../../../../../constants';
import style from './watch-list.module.scss';

export class WatchListAdd extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {
        address: '',
        description: '',
        addressError: '',
        disabledSaveBtn: true,
        checkbox: 1,
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        const { t } = this.props;
        const errorText = value.length < 2 ? t('error.min_length', { digit: 2 }) : '';

        if (name === 'address') {
            this.setState({
                [name]: value.trim(),
                addressError: errorText,
                disabledSaveBtn: !(value.length >= 2),
            });
        }

        if (name === 'description') {
            this.setState({
                [name]: value.trim(),
            });
        }
    };

    checkboxOnChange = e => {
        const { value } = e.target;
        this.setState({
            checkbox: value,
        });
    };

    back = () => {
        const { history } = this.props;
        history.push(watchListPath);
    };

    save = () => {
        console.log('save');
    };

    render() {
        const { t } = this.props;
        const {
            address,
            addressError,
            description,
            disabledSaveBtn,
            checkbox,
        } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('addNewAddressToWatchList')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_label}>BTC {t('address')}</p>
                        <div className={style.edit__inputContainer}>
                            <Field
                                id="address"
                                type="text"
                                name="address"
                                placeholder={t('typeHere')}
                                value={address}
                                onChange={this.inputOnChange}
                                inputStyle={style.edit__input}
                                labelStyle={style.edit__label}
                                labelStyleActive={style.edit__labelActive}
                            />
                            {addressError ? (
                                <div className={style.edit__error}>
                                    <InfoIcon className={style.edit__error_icon} />
                                    <p className={style.edit__error_text}>
                                        {addressError}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_label}>{t('description')}</p>
                        <div className={style.edit__inputContainer}>
                            <Field
                                id="description"
                                type="text"
                                name="description"
                                placeholder={t('optional')}
                                value={description}
                                onChange={this.inputOnChange}
                                inputStyle={style.edit__input}
                                labelStyle={style.edit__label}
                                labelStyleActive={style.edit__labelActive}
                            />
                        </div>
                    </div>
                    <p className={style.edit__text}>{t('monitorIncomingTransaction')}</p>
                    <br />
                    <br />
                    <p className={style.edit__text}>{t('selectNotification')}</p>
                    <div className={style.radioGroup}>
                        <Radio.Group onChange={this.checkboxOnChange} value={checkbox}>
                            <Radio value={1}>{t('noNotification')}</Radio>
                            <Radio value={2}>{t('notifyIncomingOutgoingTxns')}</Radio>
                            <Radio value={3}>{t('notifyOnlyIncoming')}</Radio>
                            <Radio value={4}>{t('notifyOnlyOutgoing')}</Radio>
                        </Radio.Group>
                    </div>
                    <div className={style.edit__buttonWrapper}>
                        <div className={style.edit__buttonWrapper_leftSide}>
                            <Button
                                type="button"
                                className={style.edit__buttonWrapper_back}
                                onClick={this.back}
                            >
                                {t('back')}
                            </Button>
                            <Button
                                type="submit"
                                className={style.edit__buttonWrapper_save}
                                onClick={this.save}
                                disabled={disabledSaveBtn}
                            >
                                {t('save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(WatchListAdd);
