import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withGetService from '../../../../hoc/with-get-service';
import MasterNodeValidatorView from './masterNode-validator-view';
import { compose } from '../../../../../utils';
import Spinner from '../../../../spinner';
import { editMasterNodeValidatorPath } from '../../../../../constants';
import style from './masterNode-validator.module.scss';

export class MasterNodeValidator extends Component {
    static defaultProps = {
        history: {},
        loading: false,
    };

    static propTypes = {
        history: PropTypes.object,
        loading: PropTypes.bool,
    };

    state = {
        activeMoreTab: '',
    }

    addAddress = () => {
        console.log('addAddress');
    }

    openEdit = id => {
        const { history } = this.props;
        history.push(`${editMasterNodeValidatorPath}/${id}`);
    }

    more = id => {
        const { activeMoreTab } = this.state;
        this.setState({
            activeMoreTab: activeMoreTab === id ? '' : id,
        });
    }

    render() {
        const { loading } = this.props;
        const { activeMoreTab } = this.state;

        if (loading) {
            return (
                <div className={style.container}>
                    <Spinner />
                </div>
            );
        }

        return (
            <div className={style.container}>
                <MasterNodeValidatorView
                    addAddress={this.addAddress}
                    openEdit={this.openEdit}
                    more={this.more}
                    activeMoreTab={activeMoreTab}
                />
            </div>
        );
    }
}

export default compose(withTranslation(), withGetService())(MasterNodeValidator);
