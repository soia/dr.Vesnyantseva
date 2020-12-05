import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import ChangePassword from './change-password';
import ProfileSettings from './profile-settings';
import { compose } from '../../../../../utils';
import style from './profile.module.scss';

const ProfileView = ({ user: { login, email } }) => {
    const { t } = useTranslation();
    const { TabPane } = Tabs;

    const overviewData = [
        {
            title: t('yourUsername'),
            value: login,
        },
        {
            title: t('yourEmailAddress'),
            value: email,
        },
        {
            title: t('addressWatchList'),
            value: '0 Address Alert(s)',
        },
        {
            title: t('transactionNotes'),
            value: '0 out of 1000 available limit',
        },
        {
            title: t('addressTags'),
            value: '0 out of 500 available limit',
        },
        {
            title: t('emailNotificationLimit'),
            value: '0 emails sent out 200 daily limit available',
        },
        {
            title: t('totalBTCBalance'),
            value: '0 Ether @ ($0.00)',
        },
        {
            title: t('lastLogin'),
            value: '2020-09-29 07:12:34 (UTC)',
        },
    ];

    return (
        <div id="profile">
            <Tabs defaultActiveKey="1">
                <TabPane tab={t('profileSettings')} key="1">
                    <ProfileSettings />
                </TabPane>
                <TabPane tab={t('changePassword')} key="2">
                    <ChangePassword />
                </TabPane>
                <TabPane tab={t('overview')} key="3">
                    <div className={style.overview}>
                        {overviewData.map(item => {
                            const { title, value } = item;

                            return (
                                <div key={title} className={style.overview__item}>
                                    <p className={style.overview__item_label}>{title}</p>
                                    <p className={style.overview__item_value}>{value}</p>
                                </div>
                            );
                        })}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

const mapStateToProps = state => {
    const {
        authentication: { user },
    } = state;

    return {
        user,
    };
};

ProfileView.defaultProps = {
    user: {},
};

ProfileView.propTypes = {
    user: PropTypes.object,
};

export default compose(connect(mapStateToProps))(ProfileView);
