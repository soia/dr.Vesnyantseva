import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { compose } from '../../../../utils';
import Posts from './list';
import style from './blog.module.scss';

const postsPerPage = 3;
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
        next: 3,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        // const response = await fetch(
        //     'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJWbmVFTGdSYkRCajU2bk93dHIzTHRiUjloQlJaQUJtaHBvVlZAIU2dGR0pFdG5TWkFiU01GWGxwbG9iSmFKc0VoLWhfdGxfWjRYdlhOcHJ1MHRFdUZAHRkp6VUhpekNwdy1UcG8taUl2dmNYcnhkRAZDZD',
        // );
        const response = await fetch(
            'https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=IGQVJVcVpkSFU1Y3FzbGROWXpjSjdqODBZAa3VYZAU1kNEZACTGtUNkZA3dDB3SWNZANVZAxdzZAjZA1BHd0h2TlVkYXJtTWxBYktkdDVHUXUyX1YyNDhjNG1icUhRUm5IV25sdzVZAOWkySWdn',
        );

        const user = await response.json();
        const filterOnlyImage = user.data.filter(item => item.media_type === 'IMAGE');

        this.setState({
            insta: filterOnlyImage,
        }, () => {
            this.loopWithSlice(0, postsPerPage);
        });
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

    render() {
        const { t } = this.props;
        const { insta, postsToShow } = this.state;

        return (
            <div className={style.blog} id="blog">
                <h3 className={style.blog__title}>
                    {t('blog')}
                </h3>
                <div>
                    <Posts postsToRender={postsToShow} insta={insta} />
                    <button
                        className={style.blog__loadMore}
                        onClick={this.handleShowMorePosts}
                    >
                        {t(t('loadMore'))}
                    </button>
                </div>
            </div>
        );
    }
}

export default compose(withTranslation())(Blog);
