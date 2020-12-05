import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import fetchVerificationUserAction from '../../../actions/post-verification-user.actions';
import withPostService from '../../hoc/with-post-service';
import { compose } from '../../../utils';
import Spinner from '../../spinner';
import style from './verification-user.module.scss';

class VerificationUser extends Component {
    mounted = true;

    static defaultProps = {
        t: () => {},
        verificationUser: () => {},
        location: {},
        history: {},
        loggingIn: false,
        success: false,
        loading: true,
    };

    static propTypes = {
        t: PropTypes.func,
        verificationUser: PropTypes.func,
        location: PropTypes.object,
        history: PropTypes.object,
        loggingIn: PropTypes.bool,
        success: PropTypes.bool,
        loading: PropTypes.bool,
    };

    state = {
        loading: true,
    };

    componentDidMount() {
        const {
            t,
            history,
            location: { search },
            loggingIn,
            verificationUser,
        } = this.props;
        if (loggingIn) {
            history.push('/');
        } else {
            const arrayOfStrings = search.split('=');
            const data = {
                token: arrayOfStrings[1],
            };
            verificationUser(data, t, history);
        }
    }

    componentDidUpdate(prevProps) {
        const { success, loading } = this.props;

        if (success && success !== prevProps.success) {
            console.log('success');
        }

        if (!loading && loading !== prevProps.loading && this.mounted) {
            this.setState({
                loading: false,
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { loading } = this.state;

        if (loading) {
            return <Spinner />;
        }

        return (
            <div className={style.verification} />
        );
    }
}

const mapStateToProps = state => {
    const {
        authentication: { loggingIn },
        verificationUser: { success, loading },
    } = state;

    return {
        loggingIn,
        success,
        loading,
    };
};

const mapDispatchToProps = (dispatch, { postService }) => bindActionCreators(
    {
        verificationUser: fetchVerificationUserAction(postService),
    },
    dispatch,
);

export default compose(
    withTranslation(),
    withPostService(),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(VerificationUser);
