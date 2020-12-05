import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import userIcon from '../../assets/images/icons/user-icon.svg';
import { compose } from '../../../utils';
import { loginPath } from '../../../constants/pathLocation';
import documentIcon from '../../assets/images/icons/document-icon.svg';
import style from './comments.module.scss';

class Comments extends Component {
    static defaultProps = {
        t: () => {},
        match: {},
    };

    static propTypes = {
        t: PropTypes.func,
        match: PropTypes.object,
    };

    state = {
        transaction: '',
    };

    componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        this.setState({
            transaction: id,
        });
    }

    render() {
        const { t } = this.props;
        const { transaction } = this.state;
        console.log(transaction, 'transaction');

        return (
            <div className={style.comments}>
                <header className={style.comments__header}>
                    <p className={style.comments__header_countComments}>5 {t('comments')}</p>
                    <div className={style.comments__privacy}>
                        <img src={documentIcon} alt="documentIcon" /> {t('disqusPrivacypolicy')}
                    </div>
                </header>
                <div className={style.messages}>
                    <img className={style.messages__logo} src={userIcon} alt="logo" />
                    <div className={style.messages__leftSide}>
                        <div className={style.messages__leftSide_header}>
                            <span className={style.messages__leftSide_headerName}>
                                Lina Kostenko
                            </span>
                            <span className={style.messages__leftSide_headerDate}>
                                Sep 14, 2016 18:00
                            </span>
                        </div>
                        <div className={style.messages__leftSide_message}>
                            Well, technically we don’t fly out to Colorado until Saturday,
                            but you get the point, the Oakland Raiders focus has now
                            shifted to their Week 2 clash with the division rival Denver
                            Broncos.
                        </div>
                    </div>
                </div>
                <div className={style.messages}>
                    <img className={style.messages__logo} src={userIcon} alt="logo" />
                    <div className={style.messages__leftSide}>
                        <div className={style.messages__leftSide_header}>
                            <span className={style.messages__leftSide_headerName}>
                                Lena Putyatina
                            </span>
                            <span className={style.messages__leftSide_headerDate}>
                                Sep 16, 2017 13:00
                            </span>
                        </div>
                        <div className={style.messages__leftSide_message}>
                            Well, technically we don’t fly out to Colorado until Saturday,
                            but you get the point, the Oakland Raiders focus has now
                            shifted to their Week 2 clash with the division rival Denver
                            Broncos.
                        </div>
                    </div>
                </div>
                <div className={style.messages}>
                    <img className={style.messages__logo} src={userIcon} alt="logo" />
                    <div className={style.messages__leftSide}>
                        <div className={style.messages__leftSide_signIn}>
                            {t('authorizeWriteComments')}
                            <Link
                                to={loginPath}
                                className={style.messages__leftSide_button}
                            >
                                {t('signIn')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation(), withRouter)(Comments);
