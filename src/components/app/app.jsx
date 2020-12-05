import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import ScrollToTop from '../../helpers/scroll-to-top';
import { PageNotFound, PersonalArea, VerificationUser } from '../pages';
import HomePage from '../pages/home-page/home-page';
import SearchPage from '../pages/search-page';
import DirectoryPage from '../pages/directory-page';
import BlockPage from '../pages/block-page';
import TransactionPage from '../pages/transaction-page';
import ContractPage from '../pages/contract-page';
import Footer from '../layouts/footer';
import Login from '../auth/login';
import Registration from '../auth/registration';
import Header from '../layouts/header';
import LeasingPools from '../pages/leasing-pools';
import AddressPage from '../pages/address-page';
import PasswordRestore from '../auth/password-restore';
import ResetPassword from '../auth/reset-password';
import LoadingScreen from '../loading-screen';
import AllTransactions from '../pages/all-transactions-page';
import AllBlocks from '../pages/all-blocks-page';
import TopAccounts from '../pages/top-accounts-page';
import {
    loginPath,
    registartionPath,
    passowrdRecoveryPath,
    resetPasswordPath,
    searchPath,
    BTCUDirectoryPath,
    blockPath,
    transactionPath,
    contractPath,
    personalAreaPath,
    verificationUserPath,
    leasingPoolsPath,
    addressPath,
    allTransactionsPath,
    allBlocksPath,
    topAccountsPath,
} from '../../constants';
import '../assets/styles/reset.scss';
import './app.scss';
import './pagination.scss';
import '../assets/styles/fonts.scss';
import 'react-notifications-component/dist/theme.css';

class App extends Component {
    interval = null;

    state = {
        loading: true,
        focus: null,
    };

    componentDidMount() {
        this.setState({
            focus: true,
        });
        window.addEventListener('focus', this.setFocus);
        window.addEventListener('blur', this.clearFocus);
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState) {
        const { focus } = this.state;
        if (focus !== prevState.focus) {
            if (focus) {
                this.checkVersion();
                this.interval = setInterval(this.checkVersion, 60000);
            } else {
                this.clearCheckVersion();
            }
        }
    }

    componentWillUnmount() {
        this.clearCheckVersion();
    }

    checkVersion = () => {

    }

    setFocus = () => {
        this.setState({
            focus: true,
        });
    }

    clearFocus = () => {
        this.setState({
            focus: false,
        });
    }

    clearCheckVersion = () => {
        clearInterval(this.interval);
    }

    render() {
        const { loading } = this.state;
        document.body.style.overflowY = `${loading ? 'hidden' : 'visible'}`;

        return (
            <Router>
                <Header />
                <ScrollToTop>
                    <LoadingScreen loading={loading} />
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path={loginPath} component={Login} exact />
                        <Route path={registartionPath} component={Registration} exact />
                        <Route
                            path={verificationUserPath}
                            component={VerificationUser}
                            exact
                        />
                        <Route path={passowrdRecoveryPath} component={PasswordRestore} exact />
                        <Route path={resetPasswordPath} component={ResetPassword} exact />
                        <Route path={searchPath} component={SearchPage} exact />
                        <Route path={BTCUDirectoryPath} component={DirectoryPage} exact />
                        <Route path={`${addressPath}/:id?`} component={AddressPage} exact />
                        <Route path={`${blockPath}/:id?`} component={BlockPage} exact />
                        <Route path={`${transactionPath}/:id?`} component={TransactionPage} exact />
                        <Route path={`${contractPath}/:id?`} component={ContractPage} exact />
                        <Route path={leasingPoolsPath} component={LeasingPools} exact />
                        <Route path={allTransactionsPath} component={AllTransactions} exact />
                        <Route path={topAccountsPath} component={TopAccounts} exact />
                        <Route path={allBlocksPath} component={AllBlocks} exact />
                        <Route path={personalAreaPath} component={PersonalArea} />
                        <Route component={PageNotFound} />
                    </Switch>
                </ScrollToTop>
                <ReactNotification />
            </Router>
        );
    }
}

export default App;
