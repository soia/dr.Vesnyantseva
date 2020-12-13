import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import ScrollToTop from '../../helpers/scroll-to-top';
import { PageNotFound } from '../pages';
import HomePage from '../pages/home-page/home-page';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
import LoadingScreen from '../loading-screen';
import 'whatwg-fetch';
import '../assets/styles/reset.scss';
import './app.scss';
import './pagination.scss';
import '../assets/styles/fonts.scss';
import 'react-notifications-component/dist/theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class App extends Component {
    state = {
        loading: true,
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 2000);
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
                <Footer />
                <ReactNotification />
            </Router>
        );
    }
}

export default App;
