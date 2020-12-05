import { isNumber } from '.';

const SEARCH_TYPE = {
    ALL: 'ALL',
    BLOCK: 'BLOCK',
    BLOCK_INDEX: 'BLOCK_INDEX',
    TRANSACTION: 'TRANSACTION',
    ADDRESS: 'ADDRESS',
};

const MIN_BLOCK_LENGTH = 3;

const getSearchLabel = (value, t) => {
    if (value === SEARCH_TYPE.ALL) {
        return t('allFilters');
    }

    if (value === SEARCH_TYPE.BLOCK) {
        return t('blocks');
    }

    if (value === SEARCH_TYPE.TRANSACTION) {
        return t('transactions');
    }

    if (value === SEARCH_TYPE.ADDRESS) {
        return t('addresses');
    }
};

const checkAvailableFilerData = (value, block) => {
    if (value === SEARCH_TYPE.ALL || value === block) {
        return true;
    }
    return false;
};

const isShowMinLengthFunc = (searchState, filterState) => {
    const ifString = searchState.length && searchState.length < MIN_BLOCK_LENGTH + 1 && !isNumber(searchState);

    const ifNumAndNotAvailableFilter = searchState.length < MIN_BLOCK_LENGTH + 1
        && isNumber(searchState)
        && filterState !== SEARCH_TYPE.ALL
        && filterState !== SEARCH_TYPE.BLOCK;

    if (ifString || ifNumAndNotAvailableFilter) {
        return true;
    }

    return false;
};

const isShowNoFoundBlock = (input, blockByIndex, blockByIndexSuccess) => {
    const isNoFoundBlock = input.length >= 1
        && input.length <= MIN_BLOCK_LENGTH
        && !blockByIndex.hash
        && blockByIndexSuccess;
    return isNoFoundBlock;
};

const isShowNoFoundAllSearch = (input, dropdownList, success) => {
    const isNoFoundAllSearch = input.length > MIN_BLOCK_LENGTH && !dropdownList.length && success;
    return isNoFoundAllSearch;
};

const noFoundMessageFunc = (
    searchState,
    blockByIndex,
    blockByIndexSuccess,
    dropdownSearchList,
    success,
    filter,
) => {
    const noFoundBlock = isShowNoFoundBlock(
        searchState,
        blockByIndex,
        blockByIndexSuccess,
    );
    const noFoundAllSearch = isShowNoFoundAllSearch(
        searchState,
        dropdownSearchList,
        success,
    );
    const noFoundMessage = noFoundAllSearch
        || (noFoundBlock && (filter === SEARCH_TYPE.ALL || filter === SEARCH_TYPE.BLOCK));
    return noFoundMessage;
};

export {
    SEARCH_TYPE,
    MIN_BLOCK_LENGTH,
    getSearchLabel,
    checkAvailableFilerData,
    isShowMinLengthFunc,
    noFoundMessageFunc,
};
