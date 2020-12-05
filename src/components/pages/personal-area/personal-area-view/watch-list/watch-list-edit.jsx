import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import Field from '../../../../UI/field/field';
import removeIcon from '../../../../assets/images/icons/remove-icon.svg';
import withGetService from '../../../../hoc/with-get-service';
import { compose } from '../../../../../utils';
import Button from '../../../../UI/button/button';
import { watchListPath } from '../../../../../constants';
import style from './watch-list.module.scss';

export class WatchListEdit extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {
        description: '',
        disabledSaveBtn: true,
        checkbox: 1,
    };

    inputOnChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value.trim(),
        });
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
            description,
            disabledSaveBtn,
            checkbox,
        } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('editWatchList')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_label}>{t('address')}</p>
                        <p className={style.edit__row_value}>
                            0x0030a981d7afbd243456ygtfdsw345678909876543
                        </p>
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
                        <Button
                            type="submit"
                            className={style.edit__buttonWrapper_remove}
                            onClick={this.remove}
                        >
                            <img src={removeIcon} alt="removeIcon" />
                            {t('remove')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(WatchListEdit);
