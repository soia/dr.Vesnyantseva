import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import GetService from './services/get-service';
import PostService from './services/post-service';
import { GetServiceProvider } from './components/context/get-service-context';
import { PostServiceProvider } from './components/context/post-service-context';
import ErrorBoundry from './components/pages/error-page/error-boundry';
import Spinner from './components/spinner';
import store from './store';
import './i18n';

import './components/app/app.scss';

const getService = new GetService();
const postService = new PostService();

ReactDOM.render(
    <Provider store={store}>
        <GetServiceProvider value={getService}>
            <PostServiceProvider value={postService}>
                <Suspense fallback={<Spinner />}>
                    <ErrorBoundry>
                        <App />
                    </ErrorBoundry>
                </Suspense>
            </PostServiceProvider>
        </GetServiceProvider>
    </Provider>,
    document.getElementById('root'),
);
