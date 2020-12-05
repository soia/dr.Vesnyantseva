import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import ScrollToTop from '../../helpers/scroll-to-top';
import { PageNotFound } from '../pages';
import HomePage from '../pages/home-page/home-page';
import Header from '../layouts/header';
import LoadingScreen from '../loading-screen';
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
                        <Route component={PageNotFound} />
                    </Switch>
                </ScrollToTop>
                <ReactNotification />
            </Router>
        );
    }
}

export default App;
