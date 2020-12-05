import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Field from '../../../../UI/field/field';
import withGetService from '../../../../hoc/with-get-service';
import { compose } from '../../../../../utils';
import InfoIcon from '../../../../assets/images/icons/info_icon';
import Button from '../../../../UI/button/button';
import { apiKeysPath } from '../../../../../constants';
import style from './api-keys.module.scss';

export class ApiKeysAdd extends Component {
    static defaultProps = {
        t: () => {},
        history: {},
    };

    static propTypes = {
        t: PropTypes.func,
        history: PropTypes.object,
    };

    state = {
        appName: '',
        appNameError: '',
        disabledSaveBtn: true,
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        const { t } = this.props;
        const errorText = value.length < 2 ? t('error.min_length', { digit: 2 }) : '';

        this.setState({
            [name]: value.trim(),
            appNameError: errorText,
            disabledSaveBtn: !(value.length >= 2),
        });
    };

    back = () => {
        const { history } = this.props;
        history.push(apiKeysPath);
    }

    save = () => {
        console.log('save');
    }

    remove = () => {
        console.log('remove');
    }

    render() {
        const { t } = this.props;
        const { appName, appNameError, disabledSaveBtn } = this.state;

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <p className={style.header__title}>{t('createNewApiKeys')}</p>
                </div>
                <div className={style.edit}>
                    <div className={style.edit__row}>
                        <p className={style.edit__row_labelSecond}>{t('appName')}</p>
                        <div className={style.edit__inputContainer}>
                            <Field
                                id="appName"
                                type="text"
                                name="appName"
                                labelText={t('nameApp')}
                                value={appName}
                                onChange={this.inputOnChange}
                                inputStyle={style.edit__input}
                                labelStyle={style.edit__label}
                                labelStyleActive={style.edit__labelActive}
                            />
                            {appNameError ? (
                                <div className={style.edit__error}>
                                    <InfoIcon className={style.edit__error_icon} />
                                    <p className={style.edit__error_text}>
                                        {appNameError}
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

export default compose(withTranslation(), withGetService())(ApiKeysAdd);
