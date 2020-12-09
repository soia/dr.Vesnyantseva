/* eslint-disable camelcase */
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import style from './blog.module.scss';

const Blog = () => {
    const [insta, setInsta] = useState({});
    const { t } = useTranslation();

    const loadData = async () => {
        const response = await fetch(
            'https://www.instagram.com/dr.vesnyantseva/?__a=1&max_id=100',
        );

        const user = await response.json();
        setInsta(user.graphql.user);
    };

    useEffect(() => {
        loadData();
    }, []);

    const viewsData = insta?.edge_owner_to_timeline_media?.edges || [];

    return (
        <Fragment>
            <div className={style.blog} id="blog">
                <h3 className={style.blog__title}>{t('blog')}</h3>
                <div className={style.insta}>
                    {viewsData.map(item => {
                        const {
                            display_url,
                            edge_liked_by: { count },
                            location,
                            taken_at_timestamp,
                        } = item.node;

                        console.log(insta, 'instainstainsta');
                        return (
                            <div className={style.insta__item}>
                                <div className={style.insta__top}>
                                    <img
                                        className={style.insta__top_pic}
                                        src={insta.profile_pic_url_hd}
                                        alt="pic"
                                    />
                                    <div>
                                        <p className={style.insta__top_username}>
                                            {insta.username}
                                        </p>
                                        <p className={style.insta__top_location}>
                                            {location && location.name}
                                        </p>
                                    </div>
                                </div>
                                <img
                                    className={style.insta__item_img}
                                    src={display_url}
                                    alt="url"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default Blog;
