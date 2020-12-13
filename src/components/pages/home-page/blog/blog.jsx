import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { compose } from '../../../../utils';
import Posts from './list';
import style from './blog.module.scss';

const postsPerPage = 6;
let arrayForHoldingPosts = [];

class Blog extends Component {
    static defaultProps = {
        t: () => {},
    };

    static propTypes = {
        t: PropTypes.func,
    };

    state = {
        insta: [],
        postsToShow: [],
        next: 6,
        isShowHide: false,
    };

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { insta, postsToShow } = this.state;

        if (postsToShow.length !== prevState.postsToShow.length) {
            if (insta.length === postsToShow.length) {
                this.setState({
                    isShowHide: true,
                });
            }
        }
    }

    loadData = async () => {
        // const response = await fetch(
        //     'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJWbmVFTGdSYkRCajU2bk93dHIzTHRiUjloQlJaQUJtaHBvVlZAIU2dGR0pFdG5TWkFiU01GWGxwbG9iSmFKc0VoLWhfdGxfWjRYdlhOcHJ1MHRFdUZAHRkp6VUhpekNwdy1UcG8taUl2dmNYcnhkRAZDZD',
        // );
        try {
            const response = await fetch(
                'https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=IGQVJYVEphZAnFNSDVvbHZASRlZAXbmRHcFd4eHVkNWlRRTZAKbkJhdmU5bngwU1hLWElYTy02TEtrbmFjX0pxSzdpT1VlZATAyME9oRkRSYzRvVHZA6RXZA6enA4Ql80UXhqZAm43c3Vxa1h6YjhMTDJoWURXSgZDZD',
            );

            const user = await response.json();
            this.setState(
                {
                    insta: user.data,
                },
                () => {
                    this.loopWithSlice(0, postsPerPage);
                },
            );
        } catch (e) {
            alert(e, 'error');
        }
    };

    loopWithSlice = (start, end) => {
        const { insta } = this.state;
        const slicedPosts = insta.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        this.setState({
            postsToShow: arrayForHoldingPosts,
        });
    };

    handleShowMorePosts = () => {
        const { next } = this.state;

        this.loopWithSlice(next, next + postsPerPage);
        this.setState({
            next: next + postsPerPage,
        });
    };

    close = () => {
        arrayForHoldingPosts = [];
        this.loopWithSlice(0, postsPerPage);
        this.setState({
            next: 6,
            isShowHide: false,
        });
    };

    render() {
        const { t } = this.props;
        const { insta, postsToShow, isShowHide } = this.state;

        return (
            <div className={style.blog} id="blog">
                <h3 className={style.blog__title}>{t('blog')}</h3>
                <div>
                    <Posts postsToRender={postsToShow} insta={insta} />
                    {isShowHide ? (
                        <AnchorLink
                            onClick={this.close}
                            href="#blog"
                            className={style.blog__loadMore}
                        >
                            {t(t('hide'))}
                        </AnchorLink>
                    ) : (
                        <button
                            className={style.blog__loadMore}
                            onClick={this.handleShowMorePosts}
                        >
                            {t('loadMore')}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(Blog);
