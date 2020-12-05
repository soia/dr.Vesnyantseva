import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withGetService from '../../../../hoc/with-get-service';
import WatchListView from './watch-list-view';
import { compose } from '../../../../../utils';
import Spinner from '../../../../spinner';
import { editWatchListPath } from '../../../../../constants';
import style from './watch-list.module.scss';

export class WatchList extends Component {
    static defaultProps = {
        history: {},
        loading: false,
    };

    static propTypes = {
        history: PropTypes.object,
        loading: PropTypes.bool,
    };

    componentDidMount() {}

    addAddress = () => {
        console.log('addAddress');
    }

    openEdit = id => {
        const { history } = this.props;
        history.push(`${editWatchListPath}/${id}`);
    }

    switchNotification = id => {
        console.log(id, 'switchNotification');
    }

    render() {
        const { loading } = this.props;
        if (loading) {
            return (
                <div className={style.container}>
                    <Spinner />
                </div>
            );
        }

        return (
            <div className={style.container}>
                <WatchListView
                    addAddress={this.addAddress}
                    openEdit={this.openEdit}
                    switchNotification={this.switchNotification}
                />
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(WatchList);
