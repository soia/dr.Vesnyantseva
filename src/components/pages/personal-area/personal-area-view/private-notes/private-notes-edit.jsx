import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Field from '../../../../UI/field/field';
import withGetService from '../../../../hoc/with-get-service';
import { compose } from '../../../../../utils';
import InfoIcon from '../../../../assets/images/icons/info_icon';
import removeIcon from '../../../../assets/images/icons/remove-icon.svg';
import Button from '../../../../UI/button/button';
import { txnPrivateNotesPath } from '../../../../../constants';
import style from './private-notes.module.scss';

export class PrivateNotesEdit extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {
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
            privateNoteError: errorText,
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
        const { privateNote, privateNoteError, disabledSaveBtn } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('editPrivateNote')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_label}>{t('txnHash')}</p>
                        <p className={style.edit__row_value}>
                            TS2FKRFJEPJI8673849303TREOP2
                        </p>
                    </div>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_labelSecond}>{t('updatePrivateNote')}</p>
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

export default compose(withTranslation(), withGetService())(PrivateNotesEdit);
