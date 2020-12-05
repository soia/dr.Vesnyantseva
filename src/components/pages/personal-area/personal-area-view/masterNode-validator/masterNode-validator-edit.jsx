import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Field from '../../../../UI/field/field';
import withGetService from '../../../../hoc/with-get-service';
import removeIcon from '../../../../assets/images/icons/remove-icon.svg';
import { compose } from '../../../../../utils';
import Button from '../../../../UI/button/button';
import { masterNodeValidatorPath } from '../../../../../constants';
import style from './masterNode-validator.module.scss';

export class MasterNodeValidatorEdit extends Component {
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
    };

    inputOnChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value.trim(),
        });
    };

    back = () => {
        const { history } = this.props;
        history.push(masterNodeValidatorPath);
    };

    save = () => {
        console.log('save');
    };

    render() {
        const { t } = this.props;
        const {
            description,
            disabledSaveBtn,
        } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('editValidator')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_label}>{t('masterNodeAddress')}</p>
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

export default compose(withTranslation(), withGetService())(MasterNodeValidatorEdit);
