import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import exchangesIcon from './images/exchanges-icon.svg';
import walletIcon from './images/wallet-icon.svg';
import listingIcon from './images/listing-icon.svg';
import learningIcon from './images/learning-icon.svg';
import newsIcon from './images/news-icon.svg';
import eventsIcon from './images/events-icon.svg';
import miningIcon from './images/mining-icon.svg';
import othersIcon from './images/others-icon.svg';
import smartContractIcon from './images/smart-contract-icon.svg';
import SearchIcon from '../../assets/images/icons/search-icon';
import ArrowRight from '../../assets/images/icons/arrow-right';
import { compose } from '../../../utils';
import style from './directory-page.module.scss';

class DirectoryPage extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {
        search: '',
    };

    inputOnChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    submitSearch = event => {
        event.preventDefault();
        const { search } = this.state;
        console.log(search, 'search');
    };

    render() {
        const { t } = this.props;
        const { search } = this.state;

        const data = [
            {
                icon: exchangesIcon,
                title: t('exchanges'),
                subTitle: t('placesBuyAndExchangeCcryptocyrrencies'),
                links: [
                    {
                        content: t('cryptoExchanges'),
                        path: '/',
                    },
                    {
                        content: t('Dex'),
                        path: '/',
                    },
                    {
                        content: t('fiatExchanges'),
                        path: '/',
                    },
                ],
            },
            {
                icon: walletIcon,
                title: t('wallet'),
                subTitle: t('usedToReceiveAndSpend'),
                links: [
                    {
                        content: t('guiWallets'),
                        path: '/',
                    },
                    {
                        content: t('hardwareWallets'),
                        path: '/',
                    },
                ],
            },
            {
                icon: listingIcon,
                title: t('listingAndPrices'),
                subTitle: t('listingAndPricesForProjects'),
                links: [
                    {
                        content: t('benchmarklisting'),
                        path: '/',
                    },
                    {
                        content: t('priceWatch'),
                        path: '/',
                    },
                ],
            },
            {
                icon: newsIcon,
                title: t('newsAndForums'),
                subTitle: t('getCloseToCommunity'),
                links: [
                    {
                        content: t('cryptoNews'),
                        path: '/',
                    },
                    {
                        content: t('forums'),
                        path: '/',
                    },
                ],
            },
            {
                icon: eventsIcon,
                title: t('events'),
                subTitle: t('findEventsNearYou'),
                links: [
                    {
                        content: t('upcomingEvents'),
                        path: '/',
                    },
                    {
                        content: t('pastEvents'),
                        path: '/',
                    },
                ],
            },
            {
                icon: learningIcon,
                title: t('learningResources'),
                subTitle: t('learnAboutBlockchain'),
                links: [
                    {
                        content: t('blockchain'),
                        path: '/',
                    },
                    {
                        content: 'Etherium',
                        path: '/',
                    },
                ],
            },
            {
                icon: smartContractIcon,
                title: t('smartContracts'),
                subTitle: t('forAdvancedUsers'),
                links: [
                    {
                        content: t('services'),
                        path: '/',
                    },
                    {
                        content: t('smartAuditAndSecurity'),
                        path: '/',
                    },
                    {
                        content: t('smartContractsFactory'),
                        path: '/',
                    },
                ],
            },
            {
                icon: miningIcon,
                title: t('mining'),
                subTitle: t('joinPoolStartMining'),
                links: [
                    {
                        content: t('miningPools'),
                        path: '/',
                    },
                    {
                        content: t('miningTalk'),
                        path: '/',
                    },
                ],
            },
            {
                icon: othersIcon,
                title: t('others'),
                subTitle: t('extraResources'),
                links: [
                    {
                        content: t('career'),
                        path: '/',
                    },
                    {
                        content: t('grant'),
                        path: '/',
                    },
                    {
                        content: t('tools'),
                        path: '/',
                    },
                ],
            },
        ];

        return (
            <div className={style.directory}>
                <h1 className={style.directory__title}>{t('BTCUDirectory')}</h1>
                <form className={style.search__inputWrapper} onSubmit={this.submitSearch}>
                    <input
                        type="text"
                        name="search"
                        value={search}
                        className={style.search__input}
                        placeholder={t('searchExchangesWallets')}
                        onChange={this.inputOnChange}
                    />
                    <button className={style.search__button} type="submit">
                        <SearchIcon className={style.search__searchIcon} />
                    </button>
                </form>
                <div className={style.container}>
                    {data.map(item => {
                        const {
                            icon, title, subTitle, links,
                        } = item;

                        return (
                            <div key={title} className={style.container__item}>
                                <div className={style.container__leftSide}>
                                    <img
                                        className={style.container__leftSide_icon}
                                        src={icon}
                                        alt="icon"
                                    />
                                    <p className={style.container__leftSide_title}>
                                        {title}
                                    </p>
                                    <p className={style.container__leftSide_subTitle}>
                                        {subTitle}
                                    </p>
                                </div>
                                <div className={style.container__rightSide}>
                                    {links.map(link => {
                                        const { content, path } = link;

                                        return (
                                            <div
                                                key={content}
                                                className={
                                                    style.container__rightSide_wrapper
                                                }
                                            >
                                                <ArrowRight
                                                    className={
                                                        style.container__rightSide_icon
                                                    }
                                                />
                                                <Link
                                                    className={
                                                        style.container__rightSide_link
                                                    }
                                                    to={path}
                                                >
                                                    {content}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p className={style.foundSomethingInteresting}>
                    {t('foundSomethingInteresting')} <Link to="/">{t('here')}.</Link>
                </p>
            </div>
        );
    }
}

export default compose(withTranslation())(DirectoryPage);
