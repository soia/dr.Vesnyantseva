/* eslint-disable camelcase */
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import avatar from '../../../assets/images/portrets/portret.png';
import style from './blog.module.scss';

const Blog = () => {
    const [insta, setInsta] = useState([]);
    const { t } = useTranslation();

    const loadData = async () => {
        // const response = await fetch(
        //     'https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQVJWbmVFTGdSYkRCajU2bk93dHIzTHRiUjloQlJaQUJtaHBvVlZAIU2dGR0pFdG5TWkFiU01GWGxwbG9iSmFKc0VoLWhfdGxfWjRYdlhOcHJ1MHRFdUZAHRkp6VUhpekNwdy1UcG8taUl2dmNYcnhkRAZDZD',
        // );
        const response = await fetch(
            'https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=IGQVJVcVpkSFU1Y3FzbGROWXpjSjdqODBZAa3VYZAU1kNEZACTGtUNkZA3dDB3SWNZANVZAxdzZAjZA1BHd0h2TlVkYXJtTWxBYktkdDVHUXUyX1YyNDhjNG1icUhRUm5IV25sdzVZAOWkySWdn',
        );

        const user = await response.json();

        const filterOnlyImage = user.data.filter(item => item.media_type === 'IMAGE');
        setInsta(filterOnlyImage);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Fragment>
            <div className={style.blog} id="blog">
                <h3 className={style.blog__title}>{t('blog')}</h3>
                <div className={style.insta}>
                    {insta.map(item => {
                        const {
                            caption,
                            id,
                            media_url,
                            permalink,
                            timestamp,
                            username,
                        } = item;

                        return (
                            <a
                                href={permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={id}
                                className={style.insta__item}
                            >
                                <div className={style.insta__top}>
                                    <img
                                        className={style.insta__top_pic}
                                        src={avatar}
                                        alt="pic"
                                    />
                                    <p className={style.insta__top_username}>
                                        {username}
                                    </p>
                                </div>
                                <img
                                    className={style.insta__item_img}
                                    src={media_url}
                                    alt="url"
                                />
                                <p className={style.insta__item_time}>
                                    <Moment format="DD/MM/YYYY">
                                        {timestamp}
                                    </Moment>
                                </p>
                                <p className={style.insta__item_caption}>
                                Любая хирургическая операция в полости рта может нести в себе определённые риски и осложнения. К примеру, воспаление лунки (альвеолит) после удаления зуба, отторжение фрагмента слизистой после направленной мягкотканной пластики.

                                Одной из причин этому может быть то, что очень часто полость рта пациента попросту не готова к хирургической манипуляции.

                                Как минимизировать эти риски возникновения осложнений и подготовиться к оперативному. вмешательству?

                                </p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default Blog;
