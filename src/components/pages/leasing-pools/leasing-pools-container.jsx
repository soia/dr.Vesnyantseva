import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LeasingPoolsView from './leasing-pools-view';
import { compose } from '../../../utils';
import Spinner from '../../spinner';
import style from './leasing-pools.module.scss';

const filtersList = {
    top: 'top',
    latest: 'latest',
};

class LeasingPools extends Component {
    static defaultProps = {
        loading: false,
    };

    static propTypes = {
        loading: PropTypes.bool,
    };

    state = {
        filter: '',
    };

    setFilter = id => {
        this.setState({
            filter: id,
        });
    };

    render() {
        const { loading } = this.props;
        const { filter } = this.state;

        if (loading) {
            return (
                <div className={style.container}>
                    <Spinner />
                </div>
            );
        }

        return (
            <div className={style.container}>
                <LeasingPoolsView
                    setFilter={this.setFilter}
                    filter={filter}
                    filtersList={filtersList}
                />
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(LeasingPools);
