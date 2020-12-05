import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './contract.module.scss';

const WriteContract = () => {
    const { t } = useTranslation();

    return (
        <div className={style.writeContract}>
            {t('writeContract')}
        </div>
    );
};

export default WriteContract;
