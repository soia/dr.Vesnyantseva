/* eslint-disable camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import SearchIcon from '../../assets/images/icons/search-icon';
import SearchFilter from '../../layouts/search-filter/search-filter';
import { compose } from '../../../utils';
import { SEARCH_TYPE } from '../../../helpers';
import toFixedBigValue from '../../../helpers/big-number';
import truncate from '../../../helpers/truncate-string';
import { addressPath, transactionPath, blockPath } from '../../../constants';
import mobileWidth from '../../../helpers/mobile-width';
import notFoundIcon from '../../assets/images/icons/search-not-found.svg';
import btcuIcon from '../../assets/images/icons/btcu-blue-icon.svg';
import style from './search-page.module.scss';

const SearchPage = ({
    dropdownSearchList,
    search: { input },
    searchError: { isShowMinLength, noFoundMessage },
}) => {
    const { t } = useTranslation();

    return (
        <div className={style.search}>
            <div className={style.search__container}>
                <h1 className={style.search__title}>{t('searchResults')}</h1>
                <SearchFilter
                    button={(
                        <button className={style.filter__button} type="submit">
                            <SearchIcon className={style.filter__searchIcon} />
                        </button>
                    )}
                    isHideDropdown
                    truncateMainString={mobileWidth() ? 12 : 33}
                    truncateHashString={20}
                    inputClassName={style.filter__input}
                    filterClassName={style.filter}
                />
                <div className={style.result}>
                    {!isShowMinLength
                        && !noFoundMessage
                        && dropdownSearchList.map(item => {
                            const {
                                id,
                                hash,
                                time,
                                type,
                                value,
                                output_total,
                                height,
                                balance,
                            } = item;

                            let link = '';
                            let maininfo = '';
                            let timestamp = '';
                            let hashInfo = '';
                            let valueInfo = '';
                            let tooltip = '';

                            if (type === SEARCH_TYPE.BLOCK_INDEX) {
                                link = `${blockPath}/${value}`;
                                maininfo = `${t('block')}${' '}#${value}`;
                                timestamp = `${t('timestamp')}:${' '}${moment
                                    .unix(time / 1000)
                                    .format('DD-MM-YYYY, h:mm a')}`;
                                hashInfo = `${t('hash')}:${' '}${hash}`;
                                valueInfo = `${t('value')}:${' '}${toFixedBigValue(
                                    output_total,
                                    5,
                                )}`;
                            }

                            if (type === SEARCH_TYPE.BLOCK) {
                                link = `${blockPath}/${height}`;
                                maininfo = `${t('block')}${' '}#${height}`;
                                timestamp = `${t('timestamp')}:${' '}${moment
                                    .unix(time / 1000)
                                    .format('DD-MM-YYYY, h:mm a')}`;
                                hashInfo = `${t('hash')}:${' '}${value}`;
                                valueInfo = `${t('value')}:${' '}${toFixedBigValue(
                                    output_total,
                                    5,
                                )}`;
                            }

                            if (type === SEARCH_TYPE.TRANSACTION) {
                                link = `${transactionPath}/${value}`;
                                maininfo = `BTCU ${t('transaction')}:${' '}${truncate(
                                    value,
                                    45,
                                )}`;
                                timestamp = `${t('timestamp')}:${' '}${moment
                                    .unix(time / 1000)
                                    .format('DD-MM-YYYY, h:mm a')}`;
                                hashInfo = '';
                                valueInfo = `${t('value')}:${' '}${toFixedBigValue(
                                    output_total,
                                    5,
                                )}`;
                                tooltip = value;
                            }

                            if (type === SEARCH_TYPE.ADDRESS) {
                                link = `${addressPath}/${value}`;
                                maininfo = `BTCU ${t('address')}:${' '}${value}`;
                                timestamp = '';
                                hashInfo = '';
                                valueInfo = `${t('balance')}:${' '}${toFixedBigValue(
                                    balance,
                                    5,
                                )}`;
                            }

                            return (
                                <div key={id} className={style.result__item}>
                                    <div className={style.result__item_row}>
                                        <img
                                            className={style.result__item_img}
                                            src={btcuIcon}
                                            alt="btcuIcon"
                                        />
                                        <Tooltip placement="topLeft" title={tooltip}>
                                            <Link
                                                to={link}
                                                className={style.result__item_address}
                                            >
                                                {maininfo}
                                            </Link>
                                        </Tooltip>
                                    </div>
                                    <p className={style.result__item_info}>{timestamp}</p>
                                    <p className={style.result__item_info}>{hashInfo}</p>
                                    <p className={style.result__item_info}>{valueInfo}</p>
                                </div>
                            );
                        })}

                    {!dropdownSearchList.length ? (
                        <div className={style.notFoundIcon}>
                            <img src={notFoundIcon} alt="notFoundIcon" />
                            {input ? (
                                <p className={style.notFoundIcon__title}>
                                    {t('searchFoundNothing')}
                                </p>
                            ) : (
                                <p className={style.notFoundIcon__title}>
                                    {t('emptySearchString')}
                                </p>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

SearchPage.defaultProps = {
    dropdownSearchList: [],
    search: {},
    searchError: {},
};

SearchPage.propTypes = {
    dropdownSearchList: PropTypes.instanceOf(Array),
    search: PropTypes.object,
    searchError: PropTypes.object,
};

const mapStateToProps = state => {
    const {
        dropdownSearchList: { data: dropdownSearchList },
        searchState: { search },
        searchError: { data: searchError },
    } = state;

    return {
        dropdownSearchList,
        search,
        searchError,
    };
};

export default compose(connect(mapStateToProps))(SearchPage);
