import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withGetService from '../../../../hoc/with-get-service';
import ApiKeysView from './api-keys-view';
import { compose } from '../../../../../utils';
import Spinner from '../../../../spinner';
import { editApiKeysPath } from '../../../../../constants';
import style from './api-keys.module.scss';

export class ApiKeys extends Component {
    static defaultProps = {
        loading: false,
        history: {},
    };

    static propTypes = {
        loading: PropTypes.bool,
        history: PropTypes.object,
    };

    componentDidMount() {}

    openEdit = id => {
        const { history } = this.props;
        history.push(`${editApiKeysPath}/${id}`);
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
                <ApiKeysView
                    openEdit={this.openEdit}
                    switchNotification={this.switchNotification}
                />
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(ApiKeys);
