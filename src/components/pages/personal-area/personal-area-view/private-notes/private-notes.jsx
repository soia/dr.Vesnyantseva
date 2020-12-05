import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Field from '../../../../UI/field/field';
import withGetService from '../../../../hoc/with-get-service';
import { compose } from '../../../../../utils';
import InfoIcon from '../../../../assets/images/icons/info_icon';
import Button from '../../../../UI/button/button';
import { txnPrivateNotesPath } from '../../../../../constants';
import style from './private-notes.module.scss';

export class PrivateNotesAdd extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {
        txnHash: '',
        txnHashError: '',
        privateNote: '',
        privateNoteError: '',
        disabledSaveBtn: true,
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        const { t } = this.props;
        const errorText = value.length < 2 ? t('error.min_length', { digit: 2 }) : '';

        this.setState({
            [name]: value.trim(),
            txnHashError: errorText,
            disabledSaveBtn: !(value.length >= 2),
        });
    };

    back = () => {
        const { history } = this.props;
        history.push(txnPrivateNotesPath);
    }

    save = () => {
        console.log('save');
    }

    remove = () => {
        console.log('remove');
    }

    render() {
        const { t } = this.props;
        const {
            txnHash, txnHashError, privateNote, privateNoteError, disabledSaveBtn,
        } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('createNewPrivateNote')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_labelSecond}>{t('txnHash')}</p>
                        <div className={style.edit__inputContainer}>
                            <Field
                                id="txnHash"
                                type="text"
                                name="txnHash"
                                labelText={t('txnHash')}
                                value={txnHash}
                                onChange={this.inputOnChange}
                                inputStyle={style.edit__input}
                                labelStyle={style.edit__label}
                                labelStyleActive={style.edit__labelActive}
                            />
                            {txnHashError ? (
                                <div className={style.edit__error}>
                                    <InfoIcon className={style.edit__error_icon} />
                                    <p className={style.edit__error_text}>
                                        {txnHashError}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_labelSecond}>{t('privateNote')}</p>
                        <div className={style.edit__inputContainer}>
                            <Field
                                id="privateNote"
                                type="text"
                                name="privateNote"
                                labelText={t('privateNote')}
                                value={privateNote}
                                onChange={this.inputOnChange}
                                inputStyle={style.edit__input}
                                labelStyle={style.edit__label}
                                labelStyleActive={style.edit__labelActive}
                            />
                            {privateNoteError ? (
                                <div className={style.edit__error}>
                                    <InfoIcon className={style.edit__error_icon} />
                                    <p className={style.edit__error_text}>
                                        {privateNoteError}
                                    </p>
                                </div>
                            ) : null}
                        </div>
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
                                {t('create')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(PrivateNotesAdd);
