import React, { Component, Fragment } from 'react';
import { withTranslation } from 'react-i18next';

import PersonalAreaView from '../personal-area-view';
import Spinner from '../../../spinner';
import ErrorIndicator from '../../error-page/error-indicator';
import { compose } from '../../../../utils';

class PersonalAreaContainer extends Component {
    state = {
        orders: [],
        loading: false,
    };

    componentDidMount() {
    }

    // loadData = () => {
    //     this.dummyService
    //         .getAllOrders()
    //         .then(orders => {
    //             this.setState({
    //                 orders,
    //                 loading: false,
    //                 error: false,
    //             });
    //         })
    //         .catch(this.onError);
    // };

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        });
    };

    render() {
        const { orders, loading, error } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <PersonalAreaView orders={orders} /> : null;

        return (
            <Fragment>
                {errorMessage}
                {spinner}
                {content}
            </Fragment>
        );
    }
}

export default compose(
    withTranslation(),
)(PersonalAreaContainer);
