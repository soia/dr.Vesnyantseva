import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withGetService from '../../../../hoc/with-get-service';
import PrivateNotesView from './private-notes-view';
import { compose } from '../../../../../utils';
import Spinner from '../../../../spinner';
import { editTxnPrivateNotesPath } from '../../../../../constants';
import style from './private-notes.module.scss';

export class PrivateNotes extends Component {
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
        history.push(`${editTxnPrivateNotesPath}/${id}`);
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
                <PrivateNotesView
                    openEdit={this.openEdit}
                    switchNotification={this.switchNotification}
                />
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(PrivateNotes);
