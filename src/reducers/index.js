import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { currentLocale } from './current-locale.reducer';
import deleteAvatar from './delete-user-avatar.reducer';
import drawer from './drawer.reducer';
import { dropdownSearchList } from './dropdown-search-list.reducer';
import addressInfo from './get-address-info.reducer';
import allTransactions from './get-all-transactions.reducer';
import allBlocks from './get-all-blocks.reducer';
import blockByIndex from './get-block-by-index.reducer';
import blockHash from './get-block-hash.reducer';
import latestBlocks from './get-latest-blocks.reducer';
import latestTransactions from './get-latest-transactions.reducer';
import mainPageInfo from './get-main-page-info.reducer';
import searchQuery from './get-search-query.reducer';
import transactionInfo from './get-transaction-info.reducer';
import mobileSublinks from './mobile-links.reducer';
import passwordRecovery from './post-password-recovery.reducer';
import resetPassword from './post-reset-password.reducer';
import verificationUser from './post-verification-user.reducer';
import changePassword from './put-change-password.reducer';
import updateProfile from './put-update-profile.reducer';
import { registration } from './registration.reducer';
import { searchState } from './search-state.reducer';
import transactionsByAddress from './get-transactions-by-address.reducer';
import searchBlockByIndex from './get-search-block-by-index.reducer';
import transactionsByBlock from './get-transactions-by-block.reducer';
import addressChart from './get-address-chart.reducer';
import topAccounts from './get-top-accounts.reducer';
import latestSingleBlock from './get-latest-single-block.reducer';
import searchError from './search-error.reducer';

const rootReducer = combineReducers({
    authentication,
    currentLocale,
    mainPageInfo,
    verificationUser,
    registration,
    passwordRecovery,
    resetPassword,
    mobileSublinks,
    changePassword,
    deleteAvatar,
    updateProfile,
    drawer,
    latestBlocks,
    latestTransactions,
    searchQuery,
    transactionInfo,
    addressInfo,
    blockHash,
    blockByIndex,
    searchState,
    dropdownSearchList,
    allTransactions,
    allBlocks,
    transactionsByAddress,
    searchBlockByIndex,
    transactionsByBlock,
    addressChart,
    topAccounts,
    latestSingleBlock,
    searchError,
});

export default rootReducer;
