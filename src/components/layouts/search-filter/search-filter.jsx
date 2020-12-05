/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import toFixedBigValue from '../../../helpers/big-number';
import { compose } from '../../../utils';
import withGetService from '../../hoc/with-get-service';
import getSearchQueryAction, {
    getSearchQueryResetAction,
} from '../../../actions/get-search-query.actions';
import truncate from '../../../helpers/truncate-string';
import getBlockByIndexAction from '../../../actions/get-block-by-index.actions';
import setSearchStateAction from '../../../actions/search-state.actions';
import setSearchErrorAction from '../../../actions/search-errors.actions';
import dropdownSearchListAction from '../../../actions/dropdown-search-list.actions';
import {
    isNumber,
    getSearchLabel,
    checkAvailableFilerData,
    isShowMinLengthFunc,
    noFoundMessageFunc,
    SEARCH_TYPE,
    MIN_BLOCK_LENGTH,
} from '../../../helpers';
import {
    searchPath,
    blockPath,
    transactionPath,
    addressPath,
} from '../../../constants/pathLocation';
import btcuIcon from '../../assets/images/icons/btcu-blue-icon.svg';
import ArrowDownIcon from '../../assets/images/icons/arrow-down-icon';
import style from './search-filter.module.scss';

class SearchFilter extends Component {
    rxjs = new Subject();

    static defaultProps = {
        t: () => {},
        getSearchQuery: () => {},
        getBlockByIndex: () => {},
        getSearchQueryReset: () => {},
        setSearchState: () => {},
        setDropdownSearchList: () => {},
        setSearchError: () => {},
        button: {},
        history: {},
        searchQuery: {},
        blockByIndex: {},
        searchState: {},
        searchError: {},
        inputClassName: '',
        filterClassName: '',
        blockByIndexSuccess: false,
        success: false,
        update: false,
        isHideDropdown: false,
        dropdownSearchList: [],
    };

    static propTypes = {
        t: PropTypes.func,
        getSearchQuery: PropTypes.func,
        getBlockByIndex: PropTypes.func,
        getSearchQueryReset: PropTypes.func,
        setSearchState: PropTypes.func,
        setDropdownSearchList: PropTypes.func,
        setSearchError: PropTypes.func,
        button: PropTypes.object,
        history: PropTypes.object,
        searchQuery: PropTypes.object,
        searchState: PropTypes.object,
        searchError: PropTypes.object,
        blockByIndex: PropTypes.object,
        inputClassName: PropTypes.string,
        filterClassName: PropTypes.string,
        blockByIndexSuccess: PropTypes.bool,
        success: PropTypes.bool,
        update: PropTypes.bool,
        isHideDropdown: PropTypes.bool,
        dropdownSearchList: PropTypes.instanceOf(Array),
        truncateMainString: PropTypes.number.isRequired,
        truncateHashString: PropTypes.number.isRequired,
    };

    state = {
        isHovering: false,
        focused: false,
    };

    componentDidMount() {
        const { update } = this.props;
        this.subscription = this.rxjs.pipe(debounceTime(500)).subscribe(() => {
            this.loadData();
        });

        if (update) {
            this.loadSearchData();
        }
    }

    componentDidUpdate(prevProps) {
        const {
            success,
            blockByIndexSuccess,
            getSearchQueryReset,
            searchState: { filter },
        } = this.props;

        if (success && success !== prevProps.success) {
            this.loadDropdown();
        }

        if (
            blockByIndexSuccess
            && blockByIndexSuccess !== prevProps.blockByIndexSuccess
        ) {
            this.getDataForDropdownByIndexBlock();
            getSearchQueryReset();
        }

        if (filter && filter !== prevProps.searchState.filter) {
            this.getDataForDropdown();
        }
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadDropdown = async () => {
        await this.getDataForDropdown();
        await this.isNoFoundMessage();
        this.isShowMinLength();
    };

    loadData = async () => {
        await this.loadSearchData();
        await this.isNoFoundMessage();
        this.isShowMinLength();
    };

    isShowMinLength = () => {
        const {
            searchState: { input: searchState, filter },
            searchError: { noFoundMessage },
            setSearchError,
        } = this.props;
        const isShowMinLength = isShowMinLengthFunc(searchState, filter);

        const data = {
            isShowMinLength,
            noFoundMessage,
        };
        setSearchError(data);
    };

    isNoFoundMessage = () => {
        const {
            searchState: { input: searchState, filter },
            searchError: { isShowMinLength },
            blockByIndex,
            blockByIndexSuccess,
            dropdownSearchList,
            success,
            setSearchError,
        } = this.props;

        const noFoundMessage = noFoundMessageFunc(
            searchState,
            blockByIndex,
            blockByIndexSuccess,
            dropdownSearchList,
            success,
            filter,
        );

        const data = {
            isShowMinLength,
            noFoundMessage,
        };
        setSearchError(data);
    };

    getDataForDropdown = () => {
        const {
            setDropdownSearchList,
            searchQuery: { blocks = [], transactions = [], addresses = [] },
            searchState: { filter },
        } = this.props;

        const arr = [];
        blocks.map((item, index) => {
            const {
                hash, height, time, output_total,
            } = item;

            const data = {
                id: `block${index}`,
                value: hash,
                type: SEARCH_TYPE.BLOCK,
                height,
                time,
                output_total,
            };
            return checkAvailableFilerData(filter, SEARCH_TYPE.BLOCK)
                ? arr.push(data)
                : null;
        });

        transactions.map((item, index) => {
            const { hash, output_total, time } = item;
            const data = {
                id: `transaction${index}`,
                value: hash,
                output_total,
                time,
                type: SEARCH_TYPE.TRANSACTION,
            };
            return checkAvailableFilerData(filter, SEARCH_TYPE.TRANSACTION)
                ? arr.push(data)
                : null;
        });

        addresses.map((item, index) => {
            const { address, balance } = item;
            const data = {
                id: `address${index}`,
                value: address,
                balance,
                type: SEARCH_TYPE.ADDRESS,
            };
            return checkAvailableFilerData(filter, SEARCH_TYPE.ADDRESS)
                ? arr.push(data)
                : null;
        });

        setDropdownSearchList(arr);
    };

    getDataForDropdownByIndexBlock = () => {
        const {
            setDropdownSearchList,
            blockByIndex: {
                height, hash, time, output_total,
            },
        } = this.props;
        const arr = [
            {
                id: `block${height}`,
                value: height,
                hash,
                time,
                output_total,
                type: SEARCH_TYPE.BLOCK_INDEX,
            },
        ];

        const data = hash ? arr : [];
        setDropdownSearchList(data);
    };

    onSearch = e => {
        const {
            getSearchQueryReset,
            setSearchState,
            searchState: { filter },
            setDropdownSearchList,
        } = this.props;
        const search = e.target.value;
        const data = {
            input: search,
            filter,
        };
        setSearchState(data);

        if (!search.length) {
            setDropdownSearchList([]);
            getSearchQueryReset();
        }
        this.rxjs.next(search);
    };

    submitSearch = event => {
        event.preventDefault();
        const {
            history,
            searchError: { isShowMinLength, noFoundMessage },
        } = this.props;

        if (!isShowMinLength && !noFoundMessage) {
            history.push(searchPath);
        }
    };

    loadSearchData = () => {
        const {
            setDropdownSearchList,
            getSearchQuery,
            getBlockByIndex,
            searchState: { input, filter },
        } = this.props;

        if (isNumber(input) && input.length <= MIN_BLOCK_LENGTH) {
            if (checkAvailableFilerData(filter, SEARCH_TYPE.BLOCK)) {
                return getBlockByIndex(input);
            }
            return;
        }

        if (input.length > MIN_BLOCK_LENGTH) {
            return getSearchQuery(input);
        }
        setDropdownSearchList([]);
    };

    setFilter = async filter => {
        const {
            setSearchState,
            searchState: { input },
        } = this.props;

        const data = {
            input,
            filter,
        };

        await setSearchState(data);
        await this.loadData();
        this.loadDropdown();
    };

    onMouseEnter = () => {
        this.setState({
            isHovering: true,
        });
    };

    onMouseLeave = () => {
        this.setState({
            isHovering: false,
        });
    };

    onBlur = () => {
        this.setState({ focused: false });
    };

    onFocus = () => {
        this.setState({ focused: true });
    };

    render() {
        const {
            t,
            button,
            inputClassName,
            filterClassName,
            searchState: { input: searchState, filter },
            searchError: { isShowMinLength, noFoundMessage },
            dropdownSearchList,
            truncateMainString,
            truncateHashString,
            isHideDropdown,
        } = this.props;
        const { isHovering, focused } = this.state;

        const containerStyle = classNames(style.filter, filterClassName);
        const buttonBlockStyle = dropdownSearchList.length
            ? ''
            : style.search__buttonBlock;
        let searchDropdownStyle = style.search__dropdown;

        const inputStyle = inputClassName
            ? classNames(style.filter__inputtWrapper_input, inputClassName)
            : style.filter__inputtWrapper_input;

        if (
            !isShowMinLength
            && !isHideDropdown
            && (isHovering || focused)
            && dropdownSearchList.length
        ) {
            searchDropdownStyle = classNames(
                style.search__dropdown,
                style.search__dropdownActive,
            );
        }

        const searchList = [
            {
                title: SEARCH_TYPE.ALL,
            },
            {
                title: SEARCH_TYPE.BLOCK,
            },
            {
                title: SEARCH_TYPE.TRANSACTION,
            },
            {
                title: SEARCH_TYPE.ADDRESS,
            },
        ];

        return (
            <div className={containerStyle}>
                <div className={style.filter__allFilters}>
                    <p className={style.filter__allFilters_text}>
                        {getSearchLabel(filter, t)}
                    </p>
                    <ArrowDownIcon className={style.filter__allFilters_arrowDown} />
                    <div className={style.filter__allFilters_menu}>
                        <ul>
                            {searchList.map(item => {
                                const { title } = item;

                                return (
                                    <li key={title} onClick={() => this.setFilter(title)}>
                                        {getSearchLabel(title, t)}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <form
                    className={style.filter__inputtWrapper}
                    onSubmit={this.submitSearch}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <div className={style.search}>
                        <input
                            type="text"
                            name="search"
                            value={searchState}
                            className={inputStyle}
                            placeholder={`${t('searchBy')} ${getSearchLabel(filter, t)}`}
                            onChange={this.onSearch}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            autoComplete="off"
                        />
                        <span className={buttonBlockStyle}>{button}</span>
                    </div>
                    {noFoundMessage ? (
                        <div className={style.nothingFound}>{t('nothingFound')}</div>
                    ) : null}
                    {isShowMinLength ? (
                        <div className={style.nothingFound}>
                            {t('minimumCharacters', { digit: MIN_BLOCK_LENGTH + 1 })}
                        </div>
                    ) : null}
                    <div className={searchDropdownStyle}>
                        {dropdownSearchList.map(item => {
                            const {
                                id,
                                value,
                                type,
                                hash,
                                time,
                                output_total,
                                balance,
                                height,
                            } = item;

                            let link = '';
                            let typeText = '';
                            let bottomInfo = {
                                leftTitle: '',
                                leftValue: '',
                                rightTitle: '',
                                rightValue: '',
                                tooltip: '',
                            };

                            if (type === SEARCH_TYPE.BLOCK_INDEX) {
                                link = `${blockPath}/${value}`;
                                typeText = t('block');
                                bottomInfo = {
                                    leftTitle: `${t('timestamp')}:`,
                                    leftValue: moment
                                        .unix(time / 1000)
                                        .format('DD-MM-YYYY, h:mm a'),
                                    rightTitle: `${t('hash')}:`,
                                    rightValue: truncate(hash, truncateHashString),
                                    tooltip: hash,
                                };
                            }
                            if (type === SEARCH_TYPE.BLOCK) {
                                link = `${blockPath}/${height}`;
                                typeText = t('block');
                                bottomInfo = {
                                    leftTitle: `${t('timestamp')}:`,
                                    leftValue: moment
                                        .unix(time / 1000)
                                        .format('DD-MM-YYYY, h:mm a'),
                                    rightTitle: `${t('blockHeight')}:`,
                                    rightValue: height,
                                    tooltip: height,
                                };
                            }
                            if (type === SEARCH_TYPE.TRANSACTION) {
                                link = `${transactionPath}/${value}`;
                                typeText = t('transaction');
                                bottomInfo = {
                                    leftTitle: `${t('timestamp')}:`,
                                    leftValue: moment
                                        .unix(time / 1000)
                                        .format('DD-MM-YYYY, h:mm a'),
                                    rightTitle: `${t('value')}:`,
                                    rightValue: toFixedBigValue(output_total, 5),
                                    tooltip: output_total,
                                };
                            }
                            if (type === SEARCH_TYPE.ADDRESS) {
                                link = `${addressPath}/${value}`;
                                typeText = t('address');
                                bottomInfo = {
                                    leftTitle: `${t('balance')}:`,
                                    leftValue: balance,
                                    rightTitle: '',
                                    rightValue: '',
                                    tooltip: '',
                                };
                            }

                            return (
                                <Link
                                    to={link}
                                    key={id}
                                    className={style.search__dropdown_item}
                                >
                                    <img
                                        className={style.search__dropdown_img}
                                        src={btcuIcon}
                                        alt="icon"
                                    />
                                    <div className={style.search__dropdown_wrapper}>
                                        <div className={style.search__dropdown_top}>
                                            <Tooltip placement="topLeft" title={value}>
                                                <p
                                                    className={
                                                        style.search__dropdown_address
                                                    }
                                                >
                                                    {truncate(value, truncateMainString)}
                                                </p>
                                            </Tooltip>
                                            <p className={style.search__dropdown_type}>
                                                {typeText}
                                            </p>
                                        </div>
                                        <div className={style.search__dropdown_bottom}>
                                            <p className={style.search__dropdown_date}>
                                                <span>
                                                    {bottomInfo.leftTitle}{' '}
                                                    {bottomInfo.leftValue}
                                                </span>
                                            </p>
                                            <p className={style.search__dropdown_value}>
                                                <Tooltip
                                                    placement="topLeft"
                                                    title={bottomInfo.tooltip}
                                                >
                                                    <span>
                                                        {bottomInfo.rightTitle}{' '}
                                                        {bottomInfo.rightValue}
                                                    </span>
                                                </Tooltip>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        searchQuery: {
            data: { btcu: searchQuery },
            success,
        },
        blockByIndex: { data: blockByIndex, success: blockByIndexSuccess },
        searchState: { search: searchState },
        dropdownSearchList: { data: dropdownSearchList },
        searchError: { data: searchError },
    } = state;

    return {
        searchQuery,
        success,
        blockByIndex,
        blockByIndexSuccess,
        searchState,
        dropdownSearchList,
        searchError,
    };
};

const mapDispatchToProps = (dispatch, { getService }) => bindActionCreators(
    {
        getSearchQuery: getSearchQueryAction(getService),
        getBlockByIndex: getBlockByIndexAction(getService),
        getSearchQueryReset: () => getSearchQueryResetAction(),
        setSearchState: data => setSearchStateAction(data),
        setSearchError: data => setSearchErrorAction(data),
        setDropdownSearchList: data => dropdownSearchListAction(data),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withGetService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(SearchFilter);
