import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withGetService from '../../../../hoc/with-get-service';
import ProfileView from './profile-view';
import { compose } from '../../../../../utils';
import Spinner from '../../../../spinner';
import style from './profile.module.scss';

export class Profile extends Component {
    static defaultProps = {
        loading: false,
    };

    static propTypes = {
        loading: PropTypes.bool,
    };

    componentDidMount() {}

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
                <ProfileView />
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(Profile);
