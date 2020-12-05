/* eslint-disable camelcase */
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import notification from '../../../../../../helpers/notifications';
import Spinner from '../../../../../spinner';
import { USER_CONSTANTS } from '../../../../../../constants';
import validateImageFormat from '../../../../../../helpers/validate-image-format';
import validateImageSize from '../../../../../../helpers/validate-image-size';
import i18n from '../../../../../../i18n';
import AddPhotoIcon from '../../../../../assets/images/icons/add-photo-icon';
import reduxStore from '../../../../../../store';
import style from '../profile-settings/profile-settings.module.scss';

const success = user => ({ type: USER_CONSTANTS.LOGIN_SUCCESS, user });

const uploadError = error => {
    const errorMessage = error === 'validFormatError'
        ? i18n.t('error.allowedFormat')
        : i18n.t('error.maxFileSize', { digit: 5 });

    notification('', errorMessage, 'danger');
};

const Dropzone = ({ user: { token, avatar }, deleteAvatar }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('avatar', file);

        if (!validateImageFormat(file.type)) {
            return uploadError('validFormatError');
        }
        if (!validateImageSize(file.size)) {
            return uploadError('maxFileSizeError');
        }
        setLoading(true);

        fetch(`${process.env.REACT_APP_API_AUTH_URL}/user/upload`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error();
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify(data));
                reduxStore.dispatch(success(data));
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response, 'error');
                setLoading(false);
            });
        // eslint-disable-next-line
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const Avatar = () => {
        if (loading) {
            return (
                <div className={style.rightSide__top_spinner}>
                    <Spinner />
                </div>
            );
        }
        if (avatar) {
            return (
                <img
                    className={style.rightSide__top_avatar}
                    src={avatar}
                    alt="avatar"
                />
            );
        }

        return (
            <div className={style.rightSide__top_icon}>
                <AddPhotoIcon className={style.rightSide__top_svg} />
            </div>
        );
    };


    const iconWrapperStyle = isDragActive
        ? style.rightSide__top_iconActive
        : style.rightSide__top_icon;

    const iconSvgStyle = isDragActive
        ? style.rightSide__top_svgActive
        : style.rightSide__top_svg;

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={style.rightSide__top}>
                {loading || avatar ? (
                    <Avatar />
                ) : (
                    <div className={iconWrapperStyle}>
                        <AddPhotoIcon className={iconSvgStyle} />
                    </div>
                )}
                <div className={style.rightSide__top_textWrapper}>
                    <p className={style.rightSide__top_textDesctop}>
                        {t('clickOr')}
                        <br />
                        {t('dragPhoto')}
                    </p>
                    <p className={style.rightSide__top_textMobile}>{t('addPhoto')}</p>
                    {avatar ? (
                        <div
                            onClick={deleteAvatar}
                            className={style.rightSide__top_delete}
                        >
                            {t('deletePhoto')}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

Dropzone.defaultProps = {
    deleteAvatar: () => {},
    user: {},
};

Dropzone.propTypes = {
    deleteAvatar: PropTypes.func,
    user: PropTypes.object,
};

export default Dropzone;
