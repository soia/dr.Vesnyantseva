/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import Moment from 'react-moment';
import avatar from '../../../assets/images/portrets/portret.png';
import style from './blog.module.scss';

const Posts = ({ postsToRender }) => (
    <div className={style.insta}>
        {postsToRender.map(item => {
            const {
                caption, id, media_url, permalink, timestamp, username,
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
                        <img className={style.insta__top_pic} src={avatar} alt="pic" />
                        <p className={style.insta__top_username}>{username}</p>
                    </div>
                    <img className={style.insta__item_img} src={media_url} alt="url" />
                    <p className={style.insta__item_time}>
                        <Moment format="DD/MM/YYYY">{timestamp}</Moment>
                    </p>
                    <div className={style.insta__item_caption}>
                        <LinesEllipsis
                            text={caption}
                            maxLine="2"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                        />
                    </div>
                </a>
            );
        })}
    </div>
);

Posts.defaultProps = {
    postsToRender: [],
};

Posts.propTypes = {
    postsToRender: PropTypes.instanceOf(Array),
};

export default Posts;
