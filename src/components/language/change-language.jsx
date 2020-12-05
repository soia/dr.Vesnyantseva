import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';
import 'moment/locale/en-gb';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import i18n from '../../i18n';
import withGetService from '../hoc/with-get-service';
import { getCurrentLocaleActions } from '../../actions/current-locale.actions';
import USICON from '../assets/images/flags/united-states.svg';
import RUCON from '../assets/images/flags/russia.svg';
import UAICON from '../assets/images/flags/ukraine.svg';
import style from './change-language.module.scss';

class SelectLangeage extends Component {
    componentDidMount() {
        const { setLocale } = this.props;
        const currentLang = localStorage.getItem('i18nextLngVesnyantseva');
        setLocale(currentLang);
        this.setMomentLocale(currentLang);
    }

    setMomentLocale = locale => {
        let momentLocale = '';

        if (locale === 'ru') {
            momentLocale = 'ru';
        }

        if (locale === 'en') {
            momentLocale = 'en-gb';
        }

        if (locale === 'ua') {
            momentLocale = 'uk';
        }

        moment.locale(momentLocale);
    }

    onSelectLang = countryCode => {
        const { setLocale } = this.props;
        i18n.changeLanguage(countryCode);
        localStorage.setItem('i18nextLngVesnyantseva', countryCode);
        setLocale(countryCode);
        this.setMomentLocale(countryCode);
    };

    render() {
        const { locale } = this.props;
        let flagLocale = '';
        let nextLang = '';

        if (locale === 'ru') {
            flagLocale = RUCON;
            nextLang = 'en';
        }

        if (locale === 'en') {
            flagLocale = USICON;
            nextLang = 'ua';
        }

        if (locale === 'ua') {
            flagLocale = UAICON;
            nextLang = 'ru';
        }

        return (
            <div
                className={style.container}
                id="selectLangeage"
                onClick={() => this.onSelectLang(nextLang)}
            >
                <img className={style.container__flagIcon} src={flagLocale} alt="flag" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        currentLocale: { locale },
    } = state;

    return {
        locale,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        setLocale: value => getCurrentLocaleActions.getCurrentLocale(value),
    },
    dispatch,
);

SelectLangeage.defaultProps = {
    setLocale: () => {},
    locale: '',
};

SelectLangeage.propTypes = {
    setLocale: PropTypes.func,
    locale: PropTypes.string,
};

export default compose(
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(SelectLangeage);
