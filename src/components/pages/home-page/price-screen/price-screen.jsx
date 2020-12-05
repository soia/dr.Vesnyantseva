/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ArrowRightIcon from '../../../assets/images/icons/arrow-right';
import { compose } from '../../../../utils';
import btcuIcon from '../../../assets/images/icons/btcu-icon.svg';
import difficultyIcon from '../../../assets/images/icons/difficulty-icon.svg';
import locationIcon from '../../../assets/images/icons/market-cap-icon.svg';
import transactionsIcon from '../../../assets/images/icons/transactions-icon.svg';
import style from './price-screen.module.scss';

class PriceScreen extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {};

    render() {
        const { t } = this.props;

        const options = {
            chart: {
                spacingTop: 10,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 10,
            },

            title: {
                text: '',
            },

            xAxis: {
                title: { text: '' },
                lineWidth: 0,
                minorTickLength: 0,
                tickLength: 0,
                labels: {
                    step: 7,
                },
                categories: [
                    'Sep 24',
                    'Sep 25',
                    'Sep 26',
                    'Sep 27',
                    'Sep 28',
                    'Sep 29',
                    'Sep 30',
                    'Oct 1',
                    'Oct 2',
                    'Oct 3',
                    'Oct 4',
                    'Oct 5',
                    'Oct 6',
                    'Oct 7',
                    'Oct 8',
                ],
            },

            yAxis: {
                labels: {
                    enabled: true,
                },
                gridLineWidth: 0,
                title: {
                    text: null,
                },
            },

            legend: {
                enabled: false,
            },

            credits: {
                enabled: false,
            },

            tooltip: {
                formatter() {
                    return `<span>${this.point.friendlydate}</span>\n<br />
                    <table><tr><td><span>Transactions:</span><b>
                    ${this.point.formattedValue}</b><br /><br />Price:
                    ${this.point.price}</td></tr></table>`;
                },
                style: {
                    color: 'red',
                    fontWeight: 'bold',
                },
            },

            plotOptions: {
                series: {
                    color: '#FF2911',
                    enableMouseTracking: true,
                    lineWidth: 1,
                    shadow: false,
                    animation: false,
                    cursor: 'pointer',
                    states: {
                        hover: {
                            lineWidth: 1,
                        },
                    },
                    marker: {
                        radius: 0,
                    },
                    point: {
                        events: {
                            select() {
                                window.location.href = `txs?dt=${this.options.dt}`;
                            },
                        },
                    },
                },
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                },
            },

            series: [
                {
                    name: 'Transactions',
                    type: 'spline',
                    data: [
                        {
                            y: 1087537,
                            dt: '1600905600',
                            formattedValue: '1,087,537',
                            friendlydate: 'Thursday, September 24, 2020',
                            price: '$349.18',
                        },
                        {
                            y: 1034790,
                            dt: '1600992000',
                            formattedValue: '1,034,790',
                            friendlydate: 'Friday, September 25, 2020',
                            price: '$352.02',
                        },
                        {
                            y: 984559,
                            dt: '1601078400',
                            formattedValue: '984,559',
                            friendlydate: 'Saturday, September 26, 2020',
                            price: '$354.21',
                        },
                        {
                            y: 966479,
                            dt: '1601164800',
                            formattedValue: '966,479',
                            friendlydate: 'Sunday, September 27, 2020',
                            price: '$357.67',
                        },
                        {
                            y: 1080187,
                            dt: '1601251200',
                            formattedValue: '1,080,187',
                            friendlydate: 'Monday, September 28, 2020',
                            price: '$354.01',
                        },
                        {
                            y: 1088234,
                            dt: '1601337600',
                            formattedValue: '1,088,234',
                            friendlydate: 'Tuesday, September 29, 2020',
                            price: '$0.00',
                        },
                        {
                            y: 1079040,
                            dt: '1601424000',
                            formattedValue: '1,079,040',
                            friendlydate: 'Wednesday, September 30, 2020',
                            price: '$359.86',
                        },
                        {
                            y: 1018741,
                            dt: '1601510400',
                            formattedValue: '1,018,741',
                            friendlydate: 'Thursday, October 1, 2020',
                            price: '$353.09',
                        },
                        {
                            y: 1002138,
                            dt: '1601596800',
                            formattedValue: '1,002,138',
                            friendlydate: 'Friday, October 2, 2020',
                            price: '$345.83',
                        },
                        {
                            y: 956528,
                            dt: '1601683200',
                            formattedValue: '956,528',
                            friendlydate: 'Saturday, October 3, 2020',
                            price: '$346.32',
                        },
                        {
                            y: 985452,
                            dt: '1601769600',
                            formattedValue: '985,452',
                            friendlydate: 'Sunday, October 4, 2020',
                            price: '$352.67',
                        },
                        {
                            y: 1027690,
                            dt: '1601856000',
                            formattedValue: '1,027,690',
                            friendlydate: 'Monday, October 5, 2020',
                            price: '$353.84',
                        },
                        {
                            y: 1083502,
                            dt: '1601942400',
                            formattedValue: '1,083,502',
                            friendlydate: 'Tuesday, October 6, 2020',
                            price: '$340.85',
                        },
                        {
                            y: 1035384,
                            dt: '1602028800',
                            formattedValue: '1,035,384',
                            friendlydate: 'Wednesday, October 7, 2020',
                            price: '$341.91',
                        },
                        {
                            y: 1019446,
                            dt: '1602115200',
                            formattedValue: '1,019,446',
                            friendlydate: 'Thursday, October 8, 2020',
                            price: '$351.34',
                        },
                    ],
                    allowPointSelect: true,
                    pointStart: 0,
                },
            ],
        };
        return (
            <div className={style.priceScreen}>
                <div>
                    <div className={style.priceScreen__row}>
                        <div className={style.card}>
                            <img
                                className={style.card__icon}
                                src={btcuIcon}
                                alt="btcuIcon"
                            />
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>BTCU {t('price')}</p>
                                <Tooltip placement="top" title={t('viewHistoricalPrice')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            $340.16
                                        </span>{' '}
                                        @ 0.03255 BTC{' '}
                                        <span className={style.card__content_small}>
                                            (-7.59%)
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={style.card}>
                            <img
                                className={style.card__icon}
                                src={transactionsIcon}
                                alt="transactionsIcon"
                            />
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>{t('transactions')}</p>
                                <Tooltip placement="top" title={t('transactionsCounter')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            844.34 M{' '}
                                        </span>
                                        <span className={style.card__content_small}>
                                            (14.3 TPS)
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>MED GAS {t('price')}</p>
                                <Tooltip placement="top" title={t('viewMore')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            150 Gwei{' '}
                                        </span>
                                        <span className={style.card__content_small}>
                                            ($1.07)
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                    <div className={style.priceScreen__row}>
                        <div className={style.card}>
                            <img
                                className={style.card__icon}
                                src={locationIcon}
                                alt="locationIcon"
                            />
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>MARKET CAP</p>
                                <Tooltip placement="top" title={t('viewMore')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            $38,337,813,620
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={style.card}>
                            <img
                                className={style.card__icon}
                                src={difficultyIcon}
                                alt="difficultyIcon"
                            />
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>DIFFICULTY</p>
                                <Tooltip placement="top" title={t('viewGrowthChart')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            3,256.38 TH
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={style.card}>
                            <div className={style.card__wrapper}>
                                <p className={style.card__title}>HASH RATE</p>
                                <Tooltip placement="top" title={t('averageHashRate')}>
                                    <Link to="/" className={style.card__content}>
                                        <span className={style.card__content_price}>
                                            255,298.56 GH/s
                                        </span>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.highchartsReact}>
                    <p className={style.highchartsReact__title}>
                        {`BTCU ${t('transactionHistoryInDays')}`}
                    </p>
                    <HighchartsReact highcharts={Highcharts} options={options} />
                    <Link to="/" className={style.highchartsReact__subTitle}>
                        <ArrowRightIcon /> {t('detailedChart')}
                    </Link>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(PriceScreen);
